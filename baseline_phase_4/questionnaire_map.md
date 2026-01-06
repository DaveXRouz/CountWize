# Recovery Questionnaire Map - Phase 4

**Date**: 2026-01-06
**Branch**: claude/phase-4-forms-questionnaire-qa-bi663
**Page**: recovery-questionnaire.html
**Form ID**: `#webflow-form`

---

## Structure Overview

- **Start Screen**: `.quiz-start` - Introduction with "Start" button
- **20 Question Steps**: `[data-step="1"]` through `[data-step="20"]`
- **Progress Bar**: `.progress-bar`
- **Navigation**: `.next-button`, `.back-button`
- **Submit Buttons**: `button.submit[type="submit"]` (2 variants: with/without consultation)

---

## Step-by-Step Map

### Step 1: What Happened?
| Property | Value |
|----------|-------|
| Selector | `[data-step="1"]` |
| Heading | "What Happened?" |
| Subtext | "What best describes your situation?" |
| Input Type | Radio buttons |
| Field Name | `What-Happened` |
| Required | Recommended (not enforced) |
| Options | Sent to wrong address, Wallet hacked, Exchange scam/rug pull, Forgot private keys, Other |
| Other Field | `What-Happened-other` (text, shown when "Other" selected) |
| Blocking Rule | None (can proceed without selection) |

### Step 2: How Much Crypto Was Lost?
| Property | Value |
|----------|-------|
| Selector | `[data-step="2"]` |
| Heading | "How Much Crypto Was Lost?" |
| Input Type | Radio buttons |
| Field Name | `How-Much-Crypto-Was-Lost` |
| Required | Recommended |
| Options | Less than $1,000, $1,000-$10,000, $10,000-$50,000, $50,000+, Custom amount |
| Other Field | `How-Much-Crypto-Was-Lost-other` |
| Blocking Rule | None |

### Step 3: Which Cryptocurrency Was Lost?
| Property | Value |
|----------|-------|
| Selector | `[data-step="3"]` |
| Heading | "Which Cryptocurrency Was Lost?" |
| Input Type | Radio buttons |
| Field Name | `Which-Cryptocurrency-Was-Lost` |
| Required | Recommended |
| Options | Bitcoin, Ethereum, USDT, Other |
| Other Field | `Which-Cryptocurrency-Was-Lost-other` |
| Blocking Rule | None |

### Step 4: When Did This Happen?
| Property | Value |
|----------|-------|
| Selector | `[data-step="4"]` |
| Heading | "When Did This Happen?" |
| Input Type | Radio buttons |
| Field Name | `When-Did-This-Happen` |
| Required | Recommended |
| Options | Today, Within last week, Within last month, More than a month ago |
| Blocking Rule | None |

### Step 5: To Which Wallet Address Was the Crypto Sent?
| Property | Value |
|----------|-------|
| Selector | `[data-step="5"]` |
| Heading | "To Which Wallet Address Was the Crypto Sent?" |
| Input Type | Text input |
| Field Name | `To-Which-Wallet-Address-Was-the-Crypto-Sent` |
| Required | No |
| Placeholder | "Wallet address" |
| Blocking Rule | None |

### Step 6: What Was Your Own Wallet Address?
| Property | Value |
|----------|-------|
| Selector | `[data-step="6"]` |
| Heading | "What Was Your Own Wallet Address?" |
| Input Type | Text input |
| Field Name | `What-Was-Your-Own-Wallet-Address` |
| Required | No |
| Placeholder | "Wallet address" |
| Blocking Rule | None |

### Step 7: Which Wallet Did You Use?
| Property | Value |
|----------|-------|
| Selector | `[data-step="7"]` |
| Heading | "Which Wallet Did You Use?" |
| Input Type | Radio buttons |
| Field Name | `Which-Wallet-Did-You-Use` |
| Required | Recommended |
| Options | MetaMask, Trust Wallet, Ledger/Trezor, Coinbase Wallet, Other |
| Other Field | `Which-Wallet-Did-You-Use-other` |
| Blocking Rule | None |

### Step 8: Where Did You Buy This Crypto?
| Property | Value |
|----------|-------|
| Selector | `[data-step="8"]` |
| Heading | "Where Did You Buy This Crypto?" |
| Input Type | Radio buttons |
| Field Name | `Where-Did-You-Buy-This-Crypto` |
| Required | Recommended |
| Options | Binance, Coinbase, Kraken, Other |
| Other Field | `Where-Did-You-Buy-This-Crypto-other` |
| Blocking Rule | None |

### Step 9: Did You Use a Centralized or Decentralized Exchange?
| Property | Value |
|----------|-------|
| Selector | `[data-step="9"]` |
| Heading | "Did You Use a Centralized or Decentralized Exchange?" |
| Input Type | Radio buttons |
| Field Name | `Did-You-Use-a-Centralized-or-Decentralized-Exchange` |
| Required | Recommended |
| Options | Centralized, Decentralized |
| Blocking Rule | None |

### Step 10: Do You Still Have Access to Your Wallet?
| Property | Value |
|----------|-------|
| Selector | `[data-step="10"]` |
| Heading | "Do You Still Have Access to Your Wallet?" |
| Input Type | Radio buttons |
| Field Name | `Do-You-Still-Have-Access-to-Your-Wallet` |
| Required | Recommended |
| Options | Yes, No, Partial |
| Blocking Rule | None |

### Step 11: Have You Contacted the Exchange or Wallet Provider?
| Property | Value |
|----------|-------|
| Selector | `[data-step="11"]` |
| Heading | "Have You Contacted the Exchange or Wallet Provider?" |
| Input Type | Radio buttons |
| Field Name | `Have-You-Contacted-the-Exchange-or-Wallet-Provider` |
| Required | Recommended |
| Options | Yes (no response), Yes (can't help), No |
| Blocking Rule | None |

### Step 12: Do You Have Transaction Proof?
| Property | Value |
|----------|-------|
| Selector | `[data-step="12"]` |
| Heading | "Do You Have Transaction Proof?" |
| Input Type | File upload |
| Field Name | (file input) |
| Required | No |
| Blocking Rule | None |

### Step 13: Was This a Scam or Fraud Case?
| Property | Value |
|----------|-------|
| Selector | `[data-step="13"]` |
| Heading | "Was This a Scam or Fraud Case?" |
| Input Type | Radio buttons |
| Field Name | `Was-This-a-Scam-or-Fraud-Case` |
| Required | Recommended |
| Options | Yes, No, Not sure |
| Blocking Rule | None |

### Step 14: Has This Been Reported to Authorities?
| Property | Value |
|----------|-------|
| Selector | `[data-step="14"]` |
| Heading | "Has This Been Reported to Authorities?" |
| Input Type | Radio buttons |
| Field Name | `Has-This-Been-Reported-to-Authorities` |
| Required | Recommended |
| Options | Yes with law enforcement, No |
| Blocking Rule | None |

### Step 15: How Urgent Is This Case?
| Property | Value |
|----------|-------|
| Selector | `[data-step="15"]` |
| Heading | "How Urgent Is This Case?" |
| Input Type | Radio scale (1-5) |
| Field Name | `How-Urgent-Is-This-Case` |
| Required | Recommended |
| Options | 1, 2, 3, 4, 5 |
| Blocking Rule | None |

### Step 16: Do You Own Other Crypto Assets?
| Property | Value |
|----------|-------|
| Selector | `[data-step="16"]` |
| Heading | "Do You Own Other Crypto Assets?" |
| Input Type | Radio buttons |
| Field Name | `Do-You-Own-Other-Crypto-Assets` |
| Required | Recommended |
| Options | Less than $1,000, $1,000-$10,000, $10,000-$50,000, $50,000+, No other assets |
| Blocking Rule | None |

### Step 17: Are You Open to Additional Security Measures?
| Property | Value |
|----------|-------|
| Selector | `[data-step="17"]` |
| Heading | "Are You Open to Additional Security Measures?" |
| Input Type | Radio buttons |
| Field Name | `Are-You-Open-to-Additional-Security-Measures` |
| Required | Recommended |
| Options | Yes, No |
| Blocking Rule | None |

### Step 18: Select Your Country ⚠️ BUG
| Property | Value |
|----------|-------|
| Selector | `[data-step="18"]` |
| Heading | "Which Cryptocurrency Was Lost?" ❌ **WRONG HEADING** |
| Subtext | "Select your country:" |
| Input Type | Country dropdown (`#Country`) |
| Field Name | `Country` |
| Required | Yes (for submission) |
| **BUG** | Heading says "Which Cryptocurrency Was Lost?" but step is about country selection |
| **FIX NEEDED** | Change heading to "Select Your Country" or similar |

### Step 19: Contact & Final Submission ⚠️ BUG
| Property | Value |
|----------|-------|
| Selector | `[data-step="19"]` |
| Heading | "Contact & Final Submission" |
| Subtext | "Enter your email to receive a detailed recovery assessment." |
| Input Type | Text + Email + Phone + Radio |
| Fields | `Name`, `Email`, `Phone`, `dialCode`, `Would-you-like-a-free-consultation-call` |
| Required | Email (enforced), Phone (recommended), Name (recommended) |
| **BUG 1** | Line 1080: Label says "Email:" but input is for Name |
| **BUG 2** | Line 1085: Duplicate "Email:" label |
| **FIX NEEDED** | Change first label to "Name:" and ensure unique label-input associations |

### Step 20: Schedule a Call
| Property | Value |
|----------|-------|
| Selector | `[data-step="20"]` |
| Heading | "Schedule a call" |
| Subtext | "Choose a time convenient for you" |
| Input Type | flatpickr datetime picker + timezone dropdown |
| Fields | `call_datetime`, `timezone`, `Communication-method` |
| Required | Conditional (only if user wants consultation) |
| Library | flatpickr |
| Blocking Rule | None (optional step) |

---

## Known Critical Issues

### Issue 1: Step 18 Heading Mismatch
- **Location**: Line 980
- **Current**: `<h2 class="heading-19">Which Cryptocurrency Was Lost?</h2>`
- **Expected**: Should say "Select Your Country" or similar
- **Impact**: User confusion - heading doesn't match the actual question

### Issue 2: Step 19 Duplicate "Email:" Labels
- **Location**: Lines 1080 and 1085
- **Problem**:
  - Line 1080: `<div class="text-block-64">Email:</div>` followed by Name input
  - Line 1085: `<div class="text-block-64">Email:</div>` followed by Email input
- **Impact**: Accessibility issue, user confusion
- **Fix**: Change line 1080 label to "Name:"

### Issue 3: Step 19 Name Input Has Wrong ID
- **Location**: Line 1081
- **Problem**: Input has `id="Name"` but label references unclear
- **Fix**: Add proper `<label for="Name">` association

---

## Navigation Logic

### Next Button Behavior
- Selector: `.next-button`
- Logic: Advances to next step via JavaScript
- Location: recovery-questionnaire.html inline scripts
- Known behavior: Does NOT block on required fields (soft validation only)

### Back Button Behavior
- Selector: `.back-button`
- Logic: Returns to previous step
- Known behavior: Preserves entered data

### Progress Bar
- Selector: `.progress-bar .progress-bar.active`
- Updates: Via JS on step change
- Width calculation: `(currentStep / totalSteps) * 100%`

---

## Submission Logic

### Form Submit Handler
- **Location**: Lines 1970-2107
- **Trigger**: `form.addEventListener("submit", async function (e) {...})`
- **Endpoint**: `https://telegram-vercel-seven.vercel.app/api/telegram`
- **Payload Structure**: Grouped by sections (What happened, Loss, Time, Wallet, Exchange, Security, Contact)

### Two Submit Paths
1. **With Consultation**: Standard submit button after step 20
2. **Without Consultation**: `#submit-no-cons` button (appears based on radio selection in step 19)

---

## Third-Party Libraries

1. **flatpickr**: Date/time picker for step 20
2. **intl-tel-input**: Phone input with country code (step 19)
3. **libphonenumber-js**: Phone validation (not fully integrated with blocking)
