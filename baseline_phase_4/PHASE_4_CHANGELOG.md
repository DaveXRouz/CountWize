# Phase 4 Changelog - Forms & Questionnaire Deep QA

## [1.0.0] - 2026-01-06

### Added
- `js/form-hardening.js` - Shared form hardening module with:
  - Double-submit protection (`canSubmit`, `lockForm`, `unlockForm`)
  - Request timeout handling (`fetchWithTimeout` - 30s default)
  - PII-safe error logging (`logFormError`)
  - Success/error UI helpers (`showSuccess`, `showError`)
  - Email and phone validation utilities
- Phase 4 CSS block in `css/responsive-fixes.css` (lines 2526-2580):
  - Loading spinner animation (`.cw-form-loading`)
  - Disabled submit button styles
  - Field error state styles (`.cw-field-error`)
  - Error text styling (`.cw-error-text`)
- Documentation files:
  - `baseline_phase_4/forms_inventory.md` - Complete forms inventory
  - `baseline_phase_4/questionnaire_map.md` - All 20 questionnaire steps mapped

### Changed
- **index.html**: Updated `#email-form` handler to use hardening module
- **contact-us.html**: Updated `#contact-form` handler to use hardening module
- **contact.html**: Updated `#contact-form` handler to use hardening module
- **recovery-questionnaire.html**: Updated `#webflow-form` handler to use hardening module

### Fixed
- **Step 18 heading bug**: Changed "Which Cryptocurrency Was Lost?" to "Select Your Country"
- **Step 19 label bug**: Changed duplicate "Email:" label to "Name:" with proper `<label for="Name">` association
- **PII in console logs**: Replaced `console.error("Form submission error:", err)` with safe `FH.logFormError()` across all forms

### Security
- Removed PII exposure from console.error logs in form submissions
- Added request timeout to prevent hanging submissions
- Added double-submit protection to prevent accidental duplicates

### Deprecated
- None

### Removed
- Removed verbose error messages that could expose server status codes

---

## Branch Information
- **Branch**: `claude/phase-4-forms-questionnaire-qa-bi663`
- **Base**: `claude/phase-3-mobile-tablet-hardening-bi663`

## Files Modified
1. `index.html` - Form hardening integration
2. `contact-us.html` - Form hardening integration
3. `contact.html` - Form hardening integration
4. `recovery-questionnaire.html` - Form hardening + HTML bug fixes
5. `css/responsive-fixes.css` - Phase 4 CSS block added
6. `js/form-hardening.js` - NEW: Shared hardening module

---

## [1.0.1] - 2026-01-06 (Audit Fix)

### Fixed
- **CW-ALPHA-PH4-AUDITFIX-001**: Email validation now enforced before fetch()
  - Added `validateEmailField()` function to `js/form-hardening.js` (lines 178-207)
  - Integrated validation call into all 4 hardened form handlers
  - Invalid/empty email now triggers `.w-form-fail` error UI and blocks submission
  - Form unlocks for user retry after validation failure

### Security
- Empty or invalid email can no longer trigger fetch request (deterministic block)
