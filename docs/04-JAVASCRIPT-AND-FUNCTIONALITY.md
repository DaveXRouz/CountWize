# CountWize JavaScript and Functionality

This document details all JavaScript functionality, event handlers, API integrations, and interactive features.

---

## JavaScript Files

| File | Size | Purpose |
|------|------|---------|
| `/js/webflow.js` | 450 KB | Webflow runtime, jQuery, interactions |
| Inline scripts | Varies | Page-specific functionality |

---

## External Libraries

### 1. jQuery

**Version:** 3.5.1
**Source:** Cloudflare CDN
**Usage:** DOM manipulation, event handling (via Webflow)

### 2. intl-tel-input

**Version:** 17.0.12
**Source:** cdnjs.cloudflare.com
**Purpose:** International phone number input and validation

```javascript
// Initialization
const iti = intlTelInput(input, {
  initialCountry: userCountry,
  placeholderNumberType: 'FIXED_LINE',
  separateDialCode: true,
  utilsScript: "utils.min.js"
});

// Validation
iti.isValidNumber(); // Returns boolean
iti.getValidationError(); // Returns error code 0-4
```

### 3. Flatpickr

**Source:** cdn.jsdelivr.net
**Purpose:** Date and time picker

```javascript
flatpickr("#call-datetime", {
  enableTime: true,
  inline: true,
  dateFormat: "Y-m-d H:i",
  time_24hr: true
});
```

### 4. WebFont Loader

**Version:** 1.6.26
**Source:** Google APIs
**Purpose:** Async font loading

```javascript
WebFont.load({
  google: {
    families: [
      "Be Vietnam Pro:regular,500,600,700",
      "Poppins:300,regular,500,600,700"
    ]
  }
});
```

### 5. libphonenumber-js

**Version:** 1.10.18
**Purpose:** Phone number parsing and validation

---

## API Integrations

### 1. IP Geolocation (ipapi.co)

**Endpoint:** `https://ipapi.co/json/`
**Purpose:** Detect user's country for phone input and cookie consent

```javascript
fetch('https://ipapi.co/json/')
  .then(res => res.json())
  .then(data => {
    const userCountry = data.country_code.toLowerCase();
    const countryName = data.country;

    // Used for:
    // 1. Phone input default country
    // 2. EU detection for cookie banner
    // 3. Pre-filling country select
  });
```

**Response Fields Used:**
- `country_code` - Two-letter country code (e.g., "US")
- `country` - Full country name

### 2. Countries API (countwiseapi.space)

**Base URL:** `https://countwiseapi.space/api/`

**Endpoints:**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/countries/` | GET | List all countries |
| `/countries/{id}/cities/` | GET | Cities for a country |
| `/news/?page={n}&limit={n}` | GET | Social news feed |
| `/web-news/?page={n}&limit={n}` | GET | Web news articles |
| `/big-news/?page={n}&limit=2` | GET | Featured news |

**Countries Response:**
```json
[
  { "id": 1, "name": "United States" },
  { "id": 2, "name": "United Kingdom" }
]
```

**Cities Response:**
```json
[
  { "id": 1, "name": "New York" },
  { "id": 2, "name": "Los Angeles" }
]
```

### 3. REST Countries API

**Endpoint:** `https://restcountries.com/v2/all?fields=name,alpha2Code,timezones`
**Purpose:** Country names with timezone data for scheduling

### 4. Telegram Form Submission

**Endpoint:** `https://telegram-vercel-seven.vercel.app/api/telegram`
**Method:** POST
**Content-Type:** application/json

**Request Body:**
```javascript
{
  "message": "Formatted text message with emojis",
  "files": [
    {
      "name": "document.pdf",
      "type": "application/pdf",
      "data": "base64_encoded_string"
    }
  ]
}
```

---

## Phone Input System

### Initialization

```javascript
document.addEventListener("DOMContentLoaded", function() {
  // 1. Fetch user's country
  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => {
      // 2. Dispatch custom event with country data
      document.dispatchEvent(new CustomEvent("ipDataReady", {
        detail: data
      }));
    });
});

// 3. Listen for IP data ready
document.addEventListener("ipDataReady", function(e) {
  const userCountry = e.detail.country_code?.toLowerCase() || "us";
  initPhoneInput(userCountry);
});
```

### Validation Events

```javascript
const input = document.querySelector("#Phone");
const errorMsg = document.querySelector("#error-msg");
const dialCodeInput = document.querySelector(".dialCode");

const errorMap = [
  "Invalid number",
  "Invalid country code",
  "Too short",
  "Too long",
  "Invalid number"
];

// Validate on blur
input.addEventListener('blur', function() {
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
      errorMsg.style.display = "none";
      input.style.borderColor = "#a3dcad";
    } else {
      const errorCode = iti.getValidationError();
      errorMsg.textContent = errorMap[errorCode];
      errorMsg.style.display = "block";
      input.style.borderColor = "red";
    }
  }
});

// Filter input characters
input.addEventListener('keypress', function(e) {
  const allowedChars = /[0-9\+\-\(\)\s]/;
  if (!allowedChars.test(e.key)) {
    e.preventDefault();
  }
});

// Update dial code
input.addEventListener('input', function() {
  const dialCode = iti.getSelectedCountryData().dialCode;
  dialCodeInput.value = "+" + dialCode;
});

// Prevent invalid submission
form.addEventListener('submit', function(e) {
  if (!iti.isValidNumber()) {
    e.preventDefault();
    e.stopImmediatePropagation();
    // Show error
  }
});
```

---

## Cookie Consent System

### EU Country Detection

```javascript
const EU_COUNTRIES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'NO', 'LI'
];

fetch('https://ipapi.co/json/')
  .then(res => res.json())
  .then(data => {
    const isEU = EU_COUNTRIES.includes(data.country_code);
    if (isEU) {
      showAdvancedBanner();
    } else {
      showSimpleBanner();
    }
  });
```

### Google Consent Mode

```javascript
// Default consent state (denied)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'denied',
  'personalization_storage': 'denied',
  'security_storage': 'granted'
});
```

### Banner Actions

```javascript
// Accept all
document.getElementById('accept-all').addEventListener('click', function() {
  gtag('consent', 'update', {
    'ad_storage': 'granted',
    'analytics_storage': 'granted',
    'functionality_storage': 'granted',
    'personalization_storage': 'granted'
  });
  localStorage.setItem('cookie-consent', 'all');
  hideBanner();
});

// Reject all
document.getElementById('reject-all').addEventListener('click', function() {
  gtag('consent', 'update', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied'
  });
  localStorage.setItem('cookie-consent', 'none');
  hideBanner();
});

// Custom selection
document.getElementById('customize').addEventListener('click', function() {
  const analytics = document.getElementById('analytics-consent').checked;
  const ads = document.getElementById('ads-consent').checked;

  gtag('consent', 'update', {
    'analytics_storage': analytics ? 'granted' : 'denied',
    'ad_storage': ads ? 'granted' : 'denied'
  });

  localStorage.setItem('cookie-consent', JSON.stringify({ analytics, ads }));
  hideBanner();
});
```

### LocalStorage

**Key:** `cookie-consent`
**Values:**
- `"all"` - All cookies accepted
- `"none"` - All cookies rejected
- `"simple-ok"` - Simple acknowledgment
- `JSON string` - Custom selection `{"analytics":true,"ads":false}`

---

## Mobile Menu Scroll Lock

```javascript
const menuButton = document.querySelector(".navbar-menu-button");

const disableScroll = () => {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
};

const enableScroll = () => {
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
};

const toggleScroll = () => {
  if (menuButton.classList.contains("w--open")) {
    disableScroll();
  } else {
    enableScroll();
  }
};

menuButton.addEventListener("click", () => {
  setTimeout(toggleScroll, 50);
});
```

---

## News Pagination

```javascript
let currentPage = 1;
const itemsPerPage = 4;

async function loadNews(page) {
  const response = await fetch(
    `https://countwiseapi.space/api/news/?page=${page}&limit=${itemsPerPage}`
  );
  const data = await response.json();

  if (Array.isArray(data)) {
    renderNewsItems(data);
    updatePaginationButtons(data.length);
  }
}

function updatePaginationButtons(itemCount) {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  prevBtn.classList.toggle('disabled-link', currentPage === 1);
  nextBtn.classList.toggle('disabled-link', itemCount < itemsPerPage);
}

document.getElementById('prevBtn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadNews(currentPage);
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentPage++;
  loadNews(currentPage);
});
```

---

## Multi-Step Form Navigation

### Step Management

```javascript
const steps = document.querySelectorAll('.quiz-step');
let currentStepIndex = 0;

function showStep(index) {
  // Update progress bar
  const progress = Math.round((index + 1) / steps.length * 100);
  document.querySelector(".progress-bar .active").style.width = progress + "%";

  // Exit animation
  const currentStep = steps[currentStepIndex];
  currentStep.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  currentStep.style.opacity = "0";
  currentStep.style.transform = "translateY(20px)";

  setTimeout(() => {
    currentStep.style.display = "none";

    // Enter animation
    const nextStep = steps[index];
    nextStep.style.display = "block";
    nextStep.style.opacity = "0";
    nextStep.style.transform = "translateY(40px)";

    requestAnimationFrame(() => {
      nextStep.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      nextStep.style.opacity = "1";
      nextStep.style.transform = "translateY(0)";
    });

    currentStepIndex = index;
  }, 400);
}

function goToStep(index) {
  if (index >= 0 && index < steps.length) {
    showStep(index);
  }
}
```

### Button State Management

```javascript
function activateNextButton(step) {
  const nextBtn = step.querySelector('.next-button');
  if (nextBtn) {
    nextBtn.style.opacity = "1";
    nextBtn.style.pointerEvents = "auto";
  }
}

function deactivateNextButton(step) {
  const nextBtn = step.querySelector('.next-button');
  if (nextBtn) {
    nextBtn.style.opacity = "0.5";
    nextBtn.style.pointerEvents = "none";
  }
}

// Auto-advance on radio selection
steps.forEach((step, index) => {
  const radios = step.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      activateNextButton(step);

      // Auto-advance after 300ms (except last steps)
      if (index < steps.length - 2) {
        setTimeout(() => goToStep(index + 1), 300);
      }
    });
  });
});
```

---

## File Upload System

```javascript
const maxUploads = 3;
let uploadCount = 0;
const uploadWrapper = document.querySelector('.upload-wrapper');

function createUploadField() {
  if (uploadCount >= maxUploads) return;

  const field = document.createElement("div");
  field.className = "upload-field";

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*,.pdf,.doc,.docx";
  input.id = "file-upload-" + uploadCount;
  input.name = "file" + uploadCount;
  input.style.display = "none";

  const label = document.createElement("label");
  label.htmlFor = input.id;
  label.style.cssText = "display:flex;align-items:center;gap:20px;cursor:pointer;";

  const icon = document.createElement("img");
  icon.src = "images/recovery-questionnaire-icon.svg";
  icon.className = "upload-icon";

  const text = document.createElement("div");
  text.className = "upload-text";
  text.textContent = "Upload field (Attach files)";

  label.appendChild(icon);
  label.appendChild(text);
  field.appendChild(input);
  field.appendChild(label);
  uploadWrapper.appendChild(field);

  input.addEventListener("change", handleFileSelect);
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;

  const label = e.target.nextElementSibling;
  const icon = label.querySelector('.upload-icon');
  const text = label.querySelector('.upload-text');

  const reader = new FileReader();
  reader.onload = function(e) {
    // Create preview
    const preview = document.createElement("img");
    preview.className = "upload-preview";
    preview.src = file.type.startsWith("image/") ? e.target.result : icon.src;

    icon.remove();
    label.insertBefore(preview, text);
    text.textContent = file.name;
  };
  reader.readAsDataURL(file);

  uploadCount++;
  if (uploadCount < maxUploads) {
    createUploadField();
  }
}

// Initialize first upload field
createUploadField();
```

---

## Form Submission Handler

```javascript
form.addEventListener("submit", async function(e) {
  e.preventDefault();

  // Collect form data
  const formData = new FormData(form);
  const fields = Object.fromEntries(formData.entries());

  // Process files
  const fileFields = [];
  for (const [key, value] of formData.entries()) {
    if (value instanceof File && value.size > 0) {
      fileFields.push({ name: key, file: value });
    }
  }

  // Convert files to base64
  const encodedFiles = await Promise.all(
    fileFields.map(async ({ file }) => {
      const base64 = await toBase64(file);
      return {
        name: file.name,
        type: file.type,
        data: base64.split(",")[1]
      };
    })
  );

  // Build message
  const message = formatMessage(fields);

  // Submit
  try {
    const response = await fetch(
      "https://telegram-vercel-seven.vercel.app/api/telegram",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, files: encodedFiles })
      }
    );

    if (!response.ok) throw new Error(`Status: ${response.status}`);

    // Show success
    form.style.display = "none";
    document.querySelector(".w-form-done").style.display = "block";

  } catch (err) {
    console.error("Submission error:", err);
    document.querySelector(".w-form-fail").style.display = "block";
  }
});

async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
```

---

## Case ID Generation

```javascript
function generateCaseID() {
  const caseID = Math.floor(10000 + Math.random() * 90000).toString();

  const span = document.querySelector('.number-case-id');
  const input = document.querySelector('[name="id-case"]');

  if (span) span.textContent = caseID;
  if (input) input.value = caseID;

  return caseID;
}

document.addEventListener("DOMContentLoaded", generateCaseID);
```

---

## Country Flag Emoji Conversion

```javascript
function countryCodeToFlag(code) {
  if (!code) return '';

  return [...code.toUpperCase()]
    .map(c => String.fromCodePoint(c.charCodeAt(0) + 127397))
    .join('');
}

// Example: "US" → "🇺🇸"
// Example: "GB" → "🇬🇧"
```

---

## Analytics Integration

### Google Analytics 4

```javascript
// Global site tag
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('set', 'developer_id.dZGVlNj', true);
gtag('config', 'G-0NX03W5PQR');
```

### Google Ads

```javascript
gtag('config', 'AW-447543988');
```

### LiveChat

```javascript
window.__lc = window.__lc || {};
window.__lc.license = 18977943;
window.__lc.integration_name = "manual_channels";
window.__lc.product_name = "livechat";

// Load tracking script
(function(n,t,c){
  // LiveChat loader code
})("https://cdn.livechatinc.com/tracking.js");
```

---

## Webflow Interactions

### Data Attributes

Elements with Webflow animations have these attributes:

| Attribute | Purpose |
|-----------|---------|
| `data-w-id` | Unique element ID for animation targeting |
| `data-animation` | Animation type (default, slide, etc.) |
| `data-duration` | Animation duration in ms |
| `data-easing` | Easing function |
| `data-delay` | Delay before animation starts |

### Common Pattern

```html
<div data-w-id="abc123" style="opacity:0">
  <!-- Element initially hidden -->
  <!-- Webflow.js triggers animation on scroll/load -->
</div>
```

### Slider Configuration

```html
<div data-delay="4000"
     data-animation="slide"
     data-autoplay="false"
     data-easing="ease"
     data-duration="500"
     data-infinite="false"
     class="w-slider">
  <!-- Slider content -->
</div>
```
