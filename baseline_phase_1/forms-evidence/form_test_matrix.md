# CountWize Forms Test Matrix
## Phase 1 Baseline - 2026-01-06

---

## Summary
| # | Form Name | Page | Endpoint | Status |
|---|-----------|------|----------|--------|
| 1 | Home Hero Form | index.html | Telegram API | CRITICAL PATH |
| 2 | Contact Form | contact-us.html | Telegram API | CRITICAL PATH |
| 3 | Recovery Questionnaire | recovery-questionnaire.html | Telegram API | CRITICAL PATH |
| 4 | Service Detail Form | detail_service.html | Webflow native | TEMPLATE |
| 5 | 401 Password Form | 401.html | /.wf_auth | WEBFLOW AUTH |

---

## Form 1: Home Hero Form

**Location:** `index.html:384`
**Form ID:** `email-form`
**Form Name:** `Email Form`
**Class:** `.hero-form`
**Method:** POST (via JS fetch)

### Fields
| Field Name | Type | Required | Validation |
|------------|------|----------|------------|
| Sphere | text | Yes | Hidden honeypot field |
| Name | text | Yes | None visible |
| Email | email | Yes | Client-side regex |
| Phone | tel | Yes | intl-tel-input validation |
| dialCode | hidden | Auto | Set by intl-tel-input |

### Endpoint
```
POST https://telegram-vercel-seven.vercel.app/api/telegram
Content-Type: application/json
```

### Behavior
- Button disables during submit: **UNKNOWN - requires live test**
- Double-submit protection: **UNKNOWN - requires live test**
- Success UI: Shows success message div
- Failure UI: Shows error message div

### Validation Flow
1. Phone validation via intl-tel-input library
2. Email validation via regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
3. Request blocked if validation fails

### Evidence Files Needed
- [ ] Screenshot: form_home_empty.png
- [ ] Screenshot: form_home_error_invalid_phone.png
- [ ] Screenshot: form_home_error_invalid_email.png
- [ ] Screenshot: form_home_success.png
- [ ] HAR: form_home_submit.har

---

## Form 2: Contact Form

**Location:** `contact-us.html:277`
**Form ID:** `contact-form`
**Form Name:** `wf-form-contact-form`
**Class:** `.contact-page-form`
**Method:** POST (via JS fetch)

### Fields
| Field Name | Type | Required | Validation |
|------------|------|----------|------------|
| Sphere | text | Yes | Hidden honeypot |
| Name | text | Yes | None |
| Email | email | Yes | Client-side regex |
| Phone | tel | Yes | intl-tel-input |
| Country | select | No | Populated via API |
| City | select | No | Populated via API |
| Description | textarea | No | None |
| dialCode | hidden | Auto | intl-tel-input |

### Endpoint
```
POST https://telegram-vercel-seven.vercel.app/api/telegram
Content-Type: application/json
```

### Additional APIs Used
- `https://countwiseapi.space/api/countries/` - Country list
- `https://countwiseapi.space/api/countries/{id}/cities/` - City list
- `https://ipapi.co/json/` - IP geolocation for pre-selection

### Behavior
- Button class: `.submit-button-2`
- Success UI: Shows `.w-form-done` div
- Failure UI: Shows `.w-form-fail` div with "Oops! Something went wrong..."

### Evidence Files Needed
- [ ] Screenshot: form_contact_empty.png
- [ ] Screenshot: form_contact_filled.png
- [ ] Screenshot: form_contact_error.png
- [ ] Screenshot: form_contact_success.png
- [ ] HAR: form_contact_submit.har

---

## Form 3: Recovery Questionnaire (20 Steps)

**Location:** `recovery-questionnaire.html:246`
**Form ID:** `webflow-form`
**Form Name:** `wf-form-Quiz-2`
**Class:** `.form-2`
**Method:** POST (via JS fetch)

### Endpoint
```
POST https://telegram-vercel-seven.vercel.app/api/telegram
Content-Type: application/json
```

### Step Structure
See `questionnaire_steps_1-20_notes.md` for detailed breakdown.

### Critical Fields (Step 19)
| Field Name | Type | Required | Validation |
|------------|------|----------|------------|
| Name | text | Yes | None |
| Email | email | Yes | Client-side regex |
| Phone | tel | Yes | intl-tel-input |
| id-case | text | Yes (hidden) | Auto-generated |

### Optional Fields (Step 20)
| Field Name | Type | Required | Validation |
|------------|------|----------|------------|
| call_datetime | hidden | No | Flatpickr |
| timezone | select | No | Browser timezone |

### Known Issues
1. **Step 18 Label Mismatch:** Heading says "Which Cryptocurrency Was Lost?" but question asks about Country selection
2. **Step 19 Duplicate Labels:** Two "Email:" labels appear - one before Name field, one before Email field

### Evidence Files Needed
- [ ] Screenshot: questionnaire_start.png
- [ ] Screenshots: questionnaire_step_1-20.png
- [ ] Screenshot: questionnaire_success.png
- [ ] Screenshot: questionnaire_error.png
- [ ] HAR: questionnaire_submit.har

---

## Form 4: Service Detail Form

**Location:** `detail_service.html:161`
**Form ID:** `email-form`
**Form Name:** `Email Form`
**Class:** `.service-form`
**Method:** POST (Webflow native)

### Fields
| Field Name | Type | Required | Validation |
|------------|------|----------|------------|
| Email | email | Yes | HTML5 native |

### Behavior
- Uses Webflow native form handling
- Success/Fail divs present
- This is a TEMPLATE page (may not be directly accessible)

### Evidence Files Needed
- [ ] Verify if page is accessible
- [ ] Screenshot if accessible

---

## Form 5: 401 Password Form

**Location:** `401.html:105`
**Form ID:** `email-form`
**Form Name:** `Email Form`
**Class:** `.utility-page-form .w-password-page`
**Method:** POST
**Action:** `/.wf_auth`

### Fields
| Field Name | Type | Required | Validation |
|------------|------|----------|------------|
| pass | password | Yes | Webflow auth |

### Behavior
- Webflow built-in password protection
- Used for protected pages
- Standard Webflow auth flow

---

## API Endpoints Summary

| Endpoint | Purpose | Used By |
|----------|---------|---------|
| `https://telegram-vercel-seven.vercel.app/api/telegram` | Form submissions | Home, Contact, Questionnaire |
| `https://ipapi.co/json/` | IP geolocation | All pages with phone input |
| `https://countwiseapi.space/api/countries/` | Country list | Contact form |
| `https://countwiseapi.space/api/countries/{id}/cities/` | City list | Contact form |
| `https://countwiseapi.space/api/news/` | News feed | News, Education pages |
| `https://countwiseapi.space/api/web-news/` | Web news | News, Education pages |
| `https://countwiseapi.space/api/big-news/` | Featured news | News page |
| `https://restcountries.com/v2/all` | Country/timezone data | Questionnaire |
| `/.wf_auth` | Webflow auth | 401 page |

---

## Validation Libraries

| Library | Version | Used For |
|---------|---------|----------|
| intl-tel-input | 17.0.12 | Phone number validation |
| flatpickr | latest (CDN) | Date/time picker (Step 20) |

---

## QA Gates for Forms

### Must Pass Before Any Form Changes
- [ ] All forms submit successfully with valid data
- [ ] Invalid email shows error message
- [ ] Invalid phone shows error message
- [ ] Missing required fields prevent submission
- [ ] No double-submit is possible
- [ ] Button disables during submission
- [ ] Network errors show user-friendly message
- [ ] Success state is clearly visible

### LIVE TESTING REQUIRED
This matrix documents code-level findings. Full validation requires browser testing:
- Actual form submissions
- Network request/response capture
- Mobile responsiveness
- Error state screenshots
