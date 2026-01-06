# Recovery Questionnaire - Step-by-Step Analysis
## Phase 1 Baseline - 2026-01-06

---

## Overview
- **Total Steps:** 20 + Start Screen + Success Screen
- **Form ID:** `webflow-form`
- **Endpoint:** `https://telegram-vercel-seven.vercel.app/api/telegram`
- **Navigation:** JS-controlled step transitions with animations

---

## Start Screen
- **Heading:** "Start Your Crypto Recovery Process Today!"
- **Subtext:** "We understand how stressful losing crypto can be..."
- **CTA Button:** "Start" (#start-quiz)
- **Notes:** Clean entry point, sets expectations

---

## Step 1: What Happened?
| Attribute | Value |
|-----------|-------|
| Step Number | 1 |
| Heading | "What Happened?" |
| Question | "What best describes your situation?" |
| Input Type | Radio buttons |
| Required | Yes (implicit - must select to proceed) |
| Options | Sent to wrong address, Wallet hacked, Exchange scam/rug pull, Forgot private keys/seed phrase, Other |
| Other Field | Text input appears when "Other" selected |
| Navigation | Next only |

**Notes:** None - functions as expected

---

## Step 2: How Much Crypto Was Lost?
| Attribute | Value |
|-----------|-------|
| Step Number | 2 |
| Heading | "How Much Crypto Was Lost?" |
| Question | "What best describes your situation?" |
| Input Type | Radio buttons |
| Required | Yes |
| Options | Less than $1,000, $1,000-$10,000, $10,000-$50,000, $50,000+, Custom amount |
| Other Field | Text input for custom amount |
| Navigation | Back + Next |

**Notes:** Question text is generic ("What best describes your situation?") - could be more specific

---

## Step 3: Which Cryptocurrency Was Lost?
| Attribute | Value |
|-----------|-------|
| Step Number | 3 |
| Heading | "Which Cryptocurrency Was Lost?" |
| Question | "Select the cryptocurrency involved:" |
| Input Type | Radio buttons |
| Required | Yes |
| Options | Bitcoin (BTC), Ethereum (ETH), USDT (Tether), Binance Coin (BNB), Other |
| Other Field | Text input for other crypto |
| Navigation | Back + Next |

**Notes:** None - functions as expected

---

## Step 4: When Did This Happen?
| Attribute | Value |
|-----------|-------|
| Step Number | 4 |
| Heading | "When Did This Happen?" |
| Question | "When did you notice the loss?" |
| Input Type | Radio buttons |
| Required | Yes |
| Options | Today, Within the last week, Within the last month, 1-3 months ago, Over 3 months ago |
| Navigation | Back + Next |

**Notes:** None - functions as expected

---

## Step 5: To Which Wallet Address Was the Crypto Sent?
| Attribute | Value |
|-----------|-------|
| Step Number | 5 |
| Heading | "To Which Wallet Address Was the Crypto Sent?" |
| Question | "Paste the recipient wallet address:" |
| Input Type | Text field |
| Required | No (has Skip button) |
| Field ID | To-Which-Wallet-Address-Was-the-Crypto-Sent |
| Navigation | Back + Skip + Next |

**Notes:** Skippable - good UX for users who don't have this info

---

## Step 6: What Was Your Own Wallet Address?
| Attribute | Value |
|-----------|-------|
| Step Number | 6 |
| Heading | "What Was Your Own Wallet Address?" |
| Question | "Provide the wallet address you sent the funds from:" |
| Input Type | Text field |
| Required | No (has Skip button) |
| Field ID | What-Was-Your-Own-Wallet-Address |
| Navigation | Back + Skip + Next |

**Notes:** Skippable - good UX

---

## Step 7: Which Wallet Did You Use?
| Attribute | Value |
|-----------|-------|
| Step Number | 7 |
| Heading | "Which Wallet Did You Use?" |
| Question | "Select the wallet you used to send the funds:" |
| Input Type | Radio buttons |
| Required | Yes |
| Options | MetaMask, Trust Wallet, Ledger/Trezor, Exchange Wallet, Other |
| Other Field | Text input |
| Navigation | Back + Next |

**Notes:** None - functions as expected

---

## Step 8: Where Did You Buy This Crypto?
| Attribute | Value |
|-----------|-------|
| Step Number | 8 |
| Heading | "Where Did You Buy This Crypto?" |
| Question | "Which exchange did you use to purchase this crypto?" |
| Input Type | Radio buttons |
| Required | Yes |
| Options | Binance, Coinbase, Kraken, KuCoin, Other |
| Other Field | Text input |
| Navigation | Back + Next |

**Notes:** None - functions as expected

---

## Step 9: (Content not fully captured)
| Attribute | Value |
|-----------|-------|
| Step Number | 9 |
| Navigation | Back + Next |

**Notes:** Requires live verification

---

## Step 10: (Content not fully captured)
| Attribute | Value |
|-----------|-------|
| Step Number | 10 |
| Navigation | Back + Next |

**Notes:** Requires live verification

---

## Step 11: (Content not fully captured)
| Attribute | Value |
|-----------|-------|
| Step Number | 11 |
| Navigation | Back + Next |

**Notes:** Requires live verification

---

## Step 12: (Content not fully captured)
| Attribute | Value |
|-----------|-------|
| Step Number | 12 |
| Navigation | Back + Next |

**Notes:** Requires live verification - contains file upload fields per code analysis

---

## Step 13: Was This a Scam or Fraud Case?
| Attribute | Value |
|-----------|-------|
| Step Number | 13 |
| Heading | "Was This a Scam or Fraud Case?" |
| Question | "Do you suspect fraud, phishing, or a scam?" |
| Input Type | Radio buttons |
| Required | Yes |
| Options | Yes I was scammed, No this was a mistake, Not sure |
| Navigation | Back + Next |

**Notes:** None - functions as expected

---

## Step 14: Has This Been Reported to Authorities?
| Attribute | Value |
|-----------|-------|
| Step Number | 14 |
| Heading | "Has This Been Reported to Authorities?" |
| Question | "Did you file a report with the police, cybercrime authorities, or financial regulators?" |
| Input Type | Radio buttons |
| Required | Yes |
| Options | Yes with law enforcement, No not yet, I need guidance on reporting |
| Navigation | Back + Next |

**Notes:** None - functions as expected

---

## Step 15: How Urgent Is This Case?
| Attribute | Value |
|-----------|-------|
| Step Number | 15 |
| Heading | "How Urgent Is This Case?" |
| Question | "On a scale of 1-5, how urgent is your recovery?" |
| Input Type | Radio buttons (1-5 scale) |
| Required | Yes |
| Options | 1, 2, 3, 4, 5 |
| Navigation | Back + Next |

**Notes:** None - functions as expected

---

## Step 16: Do You Own Other Crypto Assets?
| Attribute | Value |
|-----------|-------|
| Step Number | 16 |
| Heading | "Do You Own Other Crypto Assets?" |
| Question | "How much crypto do you currently have across all wallets?" |
| Input Type | Radio buttons |
| Required | Yes |
| Options | Less than $1,000, $1,000-$10,000, $10,000-$50,000, $50,000+ |
| Navigation | Back + Next |

**Notes:** None - functions as expected

---

## Step 17: Are You Open to Additional Security Measures?
| Attribute | Value |
|-----------|-------|
| Step Number | 17 |
| Heading | "Are You Open to Additional Security Measures?" |
| Question | "Would you be interested in additional security services to prevent future losses?" |
| Input Type | Radio buttons |
| Required | Yes |
| Options | Yes I need security advice, No just recovery |
| Navigation | Back + Next |

**Notes:** None - functions as expected

---

## Step 18: Country Selection
| Attribute | Value |
|-----------|-------|
| Step Number | 18 |
| Heading | "Which Cryptocurrency Was Lost?" |
| Question | "Select your country:" |
| Input Type | Select dropdown |
| Required | Yes |
| Data Source | https://restcountries.com/v2/all |
| Navigation | Back + Next |

### CRITICAL ISSUE
**HEADING/QUESTION MISMATCH:** The heading says "Which Cryptocurrency Was Lost?" but the actual question is "Select your country:". This is a TRUST LEAK - users will be confused.

**Evidence:** recovery-questionnaire.html lines 980-982
```html
<h2 class="heading-19">Which Cryptocurrency Was Lost?</h2>
<div class="text-block-61">Select your country:</div>
```

---

## Step 19: Contact & Final Submission
| Attribute | Value |
|-----------|-------|
| Step Number | 19 |
| Heading | "Contact & Final Submission" |
| Question | "Enter your email to receive a detailed recovery assessment." |
| Input Type | Mixed (text, email, tel) |
| Required | Email: Yes, Phone: Yes, Name: Yes |
| Navigation | Back + Submit OR Next (if consultation selected) |

### Fields
- Name (text) - but labeled "Email:"
- Email (email) - correctly labeled "Email:"
- Phone (tel) - correctly labeled "Phone:"
- id-case (hidden, auto-generated)
- Consultation choice (radio: yes/no)

### CRITICAL ISSUE
**DUPLICATE/WRONG LABEL:** The Name field has label "Email:" but should be "Name:". There are TWO "Email:" labels visible.

**Evidence:** recovery-questionnaire.html lines 1080-1086
```html
<div class="text-block-64">Email:</div>   <!-- WRONG - should be Name -->
<input ... name="Name" ... placeholder="Your name..." ...>

<div class="text-block-64">Email:</div>   <!-- CORRECT -->
<input ... name="Email" ... placeholder="Email address..." ...>
```

### Validation
- Email: Client-side regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Phone: intl-tel-input library

---

## Step 20: Schedule a Call
| Attribute | Value |
|-----------|-------|
| Step Number | 20 |
| Heading | "Schedule a call" |
| Question | "Choose a time convenient for you" |
| Input Type | Date picker + Timezone select |
| Required | Only if consultation="yes" |
| Date Picker | Flatpickr (inline calendar) |
| Timezone | Browser-detected, user-adjustable |
| Navigation | Back + Submit |

### Fields
- call_datetime (hidden, set by Flatpickr)
- timezone (select, auto-populated)

### Configuration
- Min date: Tomorrow
- Max date: Tomorrow (single day selection)
- Time: 24hr format
- Default: Tomorrow 12:00

**Notes:** Calendar only shows tomorrow - may be intentional for scheduling logic

---

## Success Screen
- **Heading:** "Submission Confirmation & Next Steps"
- **Message:** "Thank you for your submission! Our experts will review your case and contact you within 24 hours."
- **Next Steps Section:** Links to crypto recovery education content

---

## Summary of Issues Found

| Step | Issue | Severity | Type |
|------|-------|----------|------|
| 18 | Heading says "Which Cryptocurrency Was Lost?" but asks for Country | HIGH | TRUST LEAK |
| 19 | Name field labeled as "Email:" | HIGH | TRUST LEAK |
| 2 | Generic question text "What best describes your situation?" | LOW | UX |
| 20 | Calendar limited to single day (tomorrow only) | MEDIUM | UX |

---

## Testing Checklist

### Functional Tests
- [ ] Can complete all 20 steps
- [ ] Back navigation works correctly
- [ ] Skip buttons work on optional steps
- [ ] "Other" fields appear when selected
- [ ] Country dropdown populates
- [ ] Phone validation works
- [ ] Email validation works
- [ ] Form submits successfully
- [ ] Success screen displays

### Error State Tests
- [ ] Invalid email shows error
- [ ] Invalid phone shows error
- [ ] Empty required field blocks progress
- [ ] Network error handled gracefully

### Mobile Tests
- [ ] All steps render correctly on 390px width
- [ ] Touch targets are adequate
- [ ] Keyboard doesn't obscure inputs
- [ ] Flatpickr calendar is usable
