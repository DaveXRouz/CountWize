# Forms Inventory - Phase 4

**Date**: 2026-01-06
**Branch**: claude/phase-4-forms-questionnaire-qa-bi663

---

## Overview

CountWize has **4 primary lead-capture forms** plus 1 utility form:

1. **Home Hero Form** (index.html)
2. **Contact Form** (contact-us.html)
3. **Service Detail Form** (detail_service.html)
4. **Recovery Questionnaire** (recovery-questionnaire.html) - 20 steps
5. **401 Password Form** (401.html) - utility, not a lead form

---

## Form 1: Home Hero Form

| Property | Value |
|----------|-------|
| **Page** | index.html |
| **URL** | / |
| **Form ID** | `#email-form` |
| **Form Class** | `.hero-form` |
| **Container** | `#home-form.hero-form-block.w-form` |
| **Submit Button** | `button.submit-button-2[type="submit"]` |
| **Success Container** | `.success-message-3.w-form-done` |
| **Fail Container** | `.w-form-fail` |
| **Submission Mechanism** | Custom JS → Telegram API |
| **Endpoint** | `https://telegram-vercel-seven.vercel.app/api/telegram` |
| **Code Location** | index.html inline `<script>` (lines ~1790-1884) |

### Fields

| Field Name | Type | Required | Validation |
|------------|------|----------|------------|
| First-Name | text | Yes | maxlength=256 |
| Last-Name | text | Yes | maxlength=256 |
| Email | email | Yes | type=email, maxlength=256 |
| Phone | tel | Yes | maxlength=256 |
| dialCode | hidden | No | Auto-filled by intl-tel-input |
| Investment | text | Yes | maxlength=256 |
| Your-Problem | text | Yes | maxlength=256 |

### Third-Party Libraries
- `libphonenumber-js` for phone parsing/validation

---

## Form 2: Contact Form

| Property | Value |
|----------|-------|
| **Page** | contact-us.html (also contact.html - older version) |
| **URL** | /contact-us |
| **Form ID** | `#contact-form` |
| **Form Class** | `.contact-page-form` |
| **Container** | `.contact-page-form-block.w-form` |
| **Submit Button** | `button.submit-button-4[type="submit"]` |
| **Success Container** | `.success-message-4.w-form-done` |
| **Fail Container** | `.error-message-2.w-form-fail` |
| **Submission Mechanism** | Custom JS → Telegram API |
| **Endpoint** | `https://telegram-vercel-seven.vercel.app/api/telegram` |
| **Code Location** | contact-us.html inline `<script>` (lines ~864-982) |

### Fields

| Field Name | Type | Required | Validation |
|------------|------|----------|------------|
| Sphere | text | Yes | maxlength=256, hidden field |
| Full-Name | text | Yes | maxlength=256 |
| Email | email | Yes | type=email, maxlength=256 |
| Phone | tel | Yes | maxlength=256 |
| dialCode | hidden | No | Auto-filled by intl-tel-input |
| Message-Subject | text | Yes | maxlength=256 |
| Invested-Amount | text | No | maxlength=256 |
| Desired-Specialist | text | No | maxlength=256 |
| Country | select | Yes | Dynamic country dropdown |
| Town | select | Yes | Dynamic town dropdown |
| Message | textarea | Yes | maxlength=5000 |

### Third-Party Libraries
- `intl-tel-input` for phone input
- Custom country/town dropdowns

---

## Form 3: Service Detail Form

| Property | Value |
|----------|-------|
| **Page** | detail_service.html |
| **URL** | /detail_service (CMS template) |
| **Form ID** | `#email-form` |
| **Form Class** | `.service-form` |
| **Container** | `.service-form-block.w-form` |
| **Submit Button** | `input.button.w-button[type="submit"]` |
| **Success Container** | `.success-message.w-form-done` |
| **Fail Container** | `.error-message.w-form-fail` |
| **Submission Mechanism** | Webflow default (no custom JS detected) |
| **Endpoint** | Webflow form handling |
| **Code Location** | N/A (Webflow default) |

### Fields

| Field Name | Type | Required | Validation |
|------------|------|----------|------------|
| name | text | Yes | maxlength=256 |
| Phone | tel | Yes | maxlength=256 |
| Email | email | Yes | type=email, maxlength=256 |

### Third-Party Libraries
- None

### Notes
- This form uses Webflow's native form handling
- No custom Telegram submission detected
- May need Phase 4 hardening to match other forms

---

## Form 4: Recovery Questionnaire (20 Steps)

| Property | Value |
|----------|-------|
| **Page** | recovery-questionnaire.html |
| **URL** | /recovery-questionnaire |
| **Form ID** | `#webflow-form` |
| **Form Class** | `.form-2` |
| **Container** | `.form-block-3.w-form` |
| **Submit Buttons** | `button.submit[type="submit"]` (2 variants) |
| **Success Container** | `.w-form-done` |
| **Fail Container** | `.w-form-fail` |
| **Submission Mechanism** | Custom JS → Telegram API |
| **Endpoint** | `https://telegram-vercel-seven.vercel.app/api/telegram` |
| **Code Location** | recovery-questionnaire.html inline `<script>` (lines ~1970-2107) |

### Structure
- Start screen (`.quiz-start`)
- 20 step containers (`[data-step="1"]` through `[data-step="20"]`)
- Progress bar (`.progress-bar`)
- Navigation: Next button (`.next-button`), Back button (`.back-button`)

### See: `questionnaire_map.md` for full step-by-step breakdown

---

## Form 5: 401 Password Form (Utility)

| Property | Value |
|----------|-------|
| **Page** | 401.html |
| **URL** | /401 |
| **Form ID** | `#email-form` |
| **Form Class** | `.utility-page-form.w-password-page` |
| **Purpose** | Password protection (not a lead form) |
| **Submission** | Webflow password protection |

### Notes
- This is a Webflow utility form for password-protected pages
- NOT a lead-capture form
- Excluded from Phase 4 hardening scope

---

## Submission Endpoint Summary

| Form | Endpoint | Method |
|------|----------|--------|
| Home Hero | `https://telegram-vercel-seven.vercel.app/api/telegram` | POST JSON |
| Contact | `https://telegram-vercel-seven.vercel.app/api/telegram` | POST JSON |
| Service Detail | Webflow default | POST form-data |
| Questionnaire | `https://telegram-vercel-seven.vercel.app/api/telegram` | POST JSON |

---

## Known Issues (Pre-Phase 4)

1. **No double-submit protection** on any form
2. **No request timeout** handling
3. **No client-side validation** before submission (relies on HTML5 only)
4. **PII in console logs** (console.error logs form submission errors)
5. **Service form** uses Webflow default, not Telegram - inconsistent
6. **Phone validation** uses libphonenumber but doesn't block invalid phones
