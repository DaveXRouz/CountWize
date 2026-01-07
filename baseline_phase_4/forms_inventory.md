# Forms Inventory — Phase 4

**Generated:** 2026-01-07

---

## Forms Hardened

| Form Location | File | Form ID/Class | Hardened |
|---------------|------|---------------|----------|
| Hero contact form | index.html | .hero-form | YES |
| Contact page form | contact-us.html | .w-form | YES |
| Legacy contact form | contact.html | .w-form | YES |
| Questionnaire submission | recovery-questionnaire.html | questionnaire form | YES |

---

## Hardening Features Applied

| Feature | index.html | contact-us.html | contact.html | recovery-questionnaire.html |
|---------|------------|-----------------|--------------|----------------------------|
| form-hardening.js included | YES | YES | YES | YES |
| canSubmit guard | YES | YES | YES | YES |
| lockForm/unlockForm | YES | YES | YES | YES |
| validateEmailField | YES | YES | YES | YES (via isValidEmail) |
| fetchWithTimeout | YES | YES | YES | YES |
| showSuccess/showError | YES | YES | YES | YES |
| PII-safe logging | YES | YES | YES | YES |

---

## Forms Excluded

| Form | Reason |
|------|--------|
| Newsletter signup (footer) | Not a full submission form, uses third-party |
| Blog comment forms | Not present in current site |
| Search forms | Not present in current site |

---

## Form Hardening Module (js/form-hardening.js)

**Exports:** `window.CWFormHardening`

| Function | Description |
|----------|-------------|
| canSubmit(form) | Double-submit guard via data-cw-submitting |
| lockForm(form, submitBtn) | Lock form, disable button, show "Submitting..." |
| unlockForm(form, submitBtn) | Unlock form, restore button text |
| fetchWithTimeout(url, opts, timeout) | AbortController-based timeout (30s default) |
| isValidEmail(email) | Basic email regex validation |
| isValidPhone(phone, dialCode) | Phone validation (7+ digits) |
| validateRequired(form) | Check all required fields |
| validateEmailField(form, submitBtn) | Validate email before fetch, unlock on fail |
| showSuccess(form) | Hide form, show .w-form-done |
| showError(form) | Show .w-form-fail |
| logFormError(formId, error) | PII-safe error logging |
