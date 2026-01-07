# Questionnaire Map — Phase 4

**Generated:** 2026-01-07
**File:** recovery-questionnaire.html

---

## Steps Overview (20 Total)

| Step | Heading | Required Fields | Validation |
|------|---------|-----------------|------------|
| 1 | Start Quiz | None | Auto-advance |
| 2 | Which Cryptocurrency Was Lost? | Radio selection | Auto-advance on select |
| 3 | What Type of Platform? | Radio selection | Auto-advance on select |
| 4 | What Happened to Your Funds? | Radio selection | Auto-advance on select |
| 5 | When Did This Occur? | Radio selection | Auto-advance on select |
| 6 | Approximate Value of Loss? | Radio selection | Auto-advance on select |
| 7 | Do You Have Transaction Records? | Radio selection | Auto-advance on select |
| 8 | Have You Contacted Platform? | Radio selection | Auto-advance on select |
| 9 | Have You Filed Reports? | Radio selection | Auto-advance on select |
| 10 | Do You Have Wallet Addresses? | Radio selection | Auto-advance on select |
| 11 | Upload Evidence | File input (optional) | Skip available |
| 12 | Additional Details | Text (optional) | Skip available |
| 13 | Previous Recovery Attempts? | Radio selection | Auto-advance on select |
| 14 | Your Goals for Recovery? | Radio selection | Auto-advance on select |
| 15 | Timeline Expectations? | Radio selection | Auto-advance on select |
| 16 | Budget Considerations? | Radio selection | Auto-advance on select |
| 17 | How Did You Hear About Us? | Radio selection | Auto-advance on select |
| 18 | **Select Your Country** | Country select | validateCurrentStep |
| 19 | **Contact & Final Submission** | Name, Email (required), Phone (required) | validateCurrentStep + isValidEmail |
| 20 | Consultation Preferences | Radio selection | Final submit |

---

## Blocking Rules

### validateCurrentStep() — Line 1735

Called before:
- Next button click (line 1860)
- "Yes" to advance from Step 19 to Step 20 (line 1927)

**Validation Logic:**

| Field Type | Validation Rule |
|------------|-----------------|
| email | `CWFormHardening.isValidEmail(value)` |
| tel | `digits.length >= 7` |
| checkbox | `input.checked` |
| radio | Any in group selected |
| text/textarea/select | `value.length > 0` |

**On Invalid:**
1. Add `cw-field-invalid` class
2. Set `aria-invalid="true"`
3. Focus first invalid field
4. Return false (blocks navigation)

---

## Step 18 — Country Selection

**Heading:** "Select Your Country" (line 1004)
**Field:** `#Country` select (dynamically populated)
**Validation:** Non-empty select value

---

## Step 19 — Contact & Final Submission

**Heading:** "Contact & Final Submission" (line 1097)

| Field | Label | ID | Type | Required |
|-------|-------|-----|------|----------|
| Name | "Name:" | Name | text | No |
| Email | "Email:" | Email | email | Yes |
| Phone | "Phone:" | Phone | tel | Yes |

**Validation:**
- Email: `isValidEmail()` via CWFormHardening
- Phone: 7+ digits
- Name: Non-empty (if required)

**Actions:**
- "Yes" (consultation) → validateCurrentStep → goToStep(20)
- "No" (no consultation) → Show submit button

---

## Submission Handlers

### submit-no-cons (No Consultation)
- Validates all fields
- Uses fetchWithTimeout with 30s timeout
- lockForm/unlockForm for double-submit protection
- PII-safe error logging

### submit-cons (With Consultation)
- Same protections as above
- Advances to Step 20 first for preferences

---

## aria-invalid Usage

Applied via JavaScript at:
- Line 1746: `input.removeAttribute('aria-invalid')` (clear)
- Line 1773: `input.setAttribute('aria-invalid', 'true')` (set on invalid)
