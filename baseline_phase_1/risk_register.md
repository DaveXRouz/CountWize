# CountWize Risk Register
## Phase 1 Baseline - 2026-01-06

---

## Risk Severity Legend
| Level | Color | Description |
|-------|-------|-------------|
| CRITICAL | RED | Immediate trust/conversion impact, must fix before Phase 2 |
| HIGH | ORANGE | Significant impact, prioritize in early phases |
| MEDIUM | YELLOW | Noticeable impact, schedule for fix |
| LOW | GREEN | Minor impact, fix opportunistically |

---

## Risk 1: Form Submission to Third-Party API
| Attribute | Value |
|-----------|-------|
| Risk Name | External API Dependency |
| Trigger | All form submissions go to telegram-vercel-seven.vercel.app |
| Impact | CRITICAL - All lead capture depends on external service |
| Detection | Monitor for 4xx/5xx responses from API endpoint |
| What NOT to do | Do not change API endpoint without testing fallback |
| Guardrails | Add retry logic, timeout handling, offline detection |

### Affected Components
- index.html form
- contact-us.html form
- recovery-questionnaire.html form

---

## Risk 2: Questionnaire Step 18 Label Mismatch
| Attribute | Value |
|-----------|-------|
| Risk Name | Misleading Form Heading |
| Trigger | User sees "Which Cryptocurrency Was Lost?" but question asks for Country |
| Impact | HIGH - Trust leak, user confusion, potential abandonment |
| Detection | Manual review, user feedback |
| What NOT to do | Do not add new similar inconsistencies when fixing |
| Guardrails | Create label audit checklist for all forms |

### Evidence
File: recovery-questionnaire.html:980-982
```html
<h2 class="heading-19">Which Cryptocurrency Was Lost?</h2>
<div class="text-block-61">Select your country:</div>
```

---

## Risk 3: Questionnaire Step 19 Duplicate Labels
| Attribute | Value |
|-----------|-------|
| Risk Name | Duplicate/Wrong Field Labels |
| Trigger | Name field labeled as "Email:", creating two "Email:" labels |
| Impact | HIGH - Trust leak, accessibility failure, form abandonment |
| Detection | Manual review, accessibility audit |
| What NOT to do | Do not change label associations without testing screen readers |
| Guardrails | Ensure every label has unique, correct for attribute |

### Evidence
File: recovery-questionnaire.html:1080-1086
```html
<div class="text-block-64">Email:</div>  <!-- Should be "Name:" -->
<input name="Name" placeholder="Your name...">
<div class="text-block-64">Email:</div>  <!-- Correct -->
<input name="Email" placeholder="Email address...">
```

---

## Risk 4: IP Geolocation API Calls on Every Page
| Attribute | Value |
|-----------|-------|
| Risk Name | Excessive External API Calls |
| Trigger | ipapi.co/json/ called on almost every page load |
| Impact | MEDIUM - Performance, potential rate limiting, privacy concerns |
| Detection | Network tab shows repeated calls, HAR analysis |
| What NOT to do | Do not remove without providing fallback for phone validation |
| Guardrails | Cache IP data in sessionStorage, deduplicate calls |

### Affected Pages
Almost all pages with phone input or cookie consent logic

---

## Risk 5: Missing Meta Descriptions on Key Pages
| Attribute | Value |
|-----------|-------|
| Risk Name | Incomplete SEO Metadata |
| Trigger | Privacy Policy, Cookie Policy, Questionnaire missing descriptions |
| Impact | MEDIUM - SEO ranking, SERP appearance |
| Detection | SEO audit tools, meta_inventory.csv |
| What NOT to do | Do not add placeholder text - use meaningful descriptions |
| Guardrails | Create meta description template for legal/policy pages |

### Missing From
- recovery-questionnaire.html
- privacy-policy.html
- cookie-policy.html

---

## Risk 6: Duplicate Contact Pages
| Attribute | Value |
|-----------|-------|
| Risk Name | Duplicate Content |
| Trigger | Both contact.html and contact-us.html exist with similar content |
| Impact | MEDIUM - SEO duplicate content, maintenance burden |
| Detection | File comparison, canonical analysis |
| What NOT to do | Do not delete without checking internal links and redirects |
| Guardrails | Implement 301 redirect from deprecated page |

---

## Risk 7: Sitemap URL Mismatch
| Attribute | Value |
|-----------|-------|
| Risk Name | Sitemap Uses www but Site May Not Redirect |
| Trigger | Sitemap references www.countwize.com but live site is countwize.com |
| Impact | MEDIUM - SEO crawling issues, index duplication |
| Detection | Check redirect behavior, Google Search Console |
| What NOT to do | Do not change sitemap without updating canonicals |
| Guardrails | Verify consistent www vs non-www across all config |

---

## Risk 8: Cookie Consent Banner Complexity
| Attribute | Value |
|-----------|-------|
| Risk Name | Dual Cookie Banner System |
| Trigger | Different banners for EU (advanced) vs non-EU (simple) based on IP |
| Impact | MEDIUM - Depends on ipapi.co, complex to test/maintain |
| Detection | Test from multiple geolocations |
| What NOT to do | Do not modify without testing both EU and non-EU experiences |
| Guardrails | Add fallback if IP detection fails |

---

## Risk 9: LiveChat Widget Overlay
| Attribute | Value |
|-----------|-------|
| Risk Name | Chat Widget May Cover CTAs on Mobile |
| Trigger | LiveChat widget position on small screens |
| Impact | MEDIUM - Potential CTA obstruction, conversion friction |
| Detection | Mobile testing at 320px, 390px widths |
| What NOT to do | Do not hide chat entirely - affects support experience |
| Guardrails | Test chat position doesn't cover submit buttons |

---

## Risk 10: Flatpickr Calendar Limited to Single Day
| Attribute | Value |
|-----------|-------|
| Risk Name | Restrictive Date Selection |
| Trigger | Step 20 calendar only allows selecting tomorrow |
| Impact | LOW - May be intentional, but confusing UX |
| Detection | User feedback, conversion analysis |
| What NOT to do | Do not extend date range without backend validation |
| Guardrails | Add clear messaging why only tomorrow is available |

### Evidence
File: recovery-questionnaire.html:1320-1321
```javascript
minDate: tomorrowFormatted,
maxDate: tomorrowFormatted,
```

---

## Risk 11: Phone Validation Library Version Lock
| Attribute | Value |
|-----------|-------|
| Risk Name | CDN Dependency on Specific Version |
| Trigger | intl-tel-input pinned to 17.0.12 via CDN |
| Impact | LOW - Works currently, but CDN availability risk |
| Detection | Monitor CDN availability |
| What NOT to do | Do not upgrade without testing all phone input forms |
| Guardrails | Consider self-hosting critical libraries |

---

## Risk 12: No Visible Form Error States in Code
| Attribute | Value |
|-----------|-------|
| Risk Name | Generic Error Handling |
| Trigger | "Oops! Something went wrong while submitting the form." is generic |
| Impact | MEDIUM - Poor user experience on errors, no actionable info |
| Detection | Test form with invalid data, offline mode |
| What NOT to do | Do not remove error divs when restyling |
| Guardrails | Enhance error messages with specific guidance |

---

## Risk 13: Template Pages May Be Indexed
| Attribute | Value |
|-----------|-------|
| Risk Name | Placeholder Template Exposure |
| Trigger | detail_*.html pages exist but may have placeholder content |
| Impact | LOW - If indexed, shows incomplete content |
| Detection | Check indexability, search for site in Google |
| What NOT to do | Do not delete templates used by CMS |
| Guardrails | Add noindex to template pages or populate with real content |

---

## Risk 14: Multiple DOMContentLoaded Listeners
| Attribute | Value |
|-----------|-------|
| Risk Name | Inline Script Complexity |
| Trigger | Many DOMContentLoaded listeners embedded in HTML |
| Impact | LOW - Performance, maintenance complexity |
| Detection | Code review, performance profiling |
| What NOT to do | Do not consolidate scripts without testing each feature |
| Guardrails | Test all interactive features after any JS changes |

---

## Risk 15: No Button Disable During Form Submit
| Attribute | Value |
|-----------|-------|
| Risk Name | Potential Double Submit |
| Trigger | Submit button may not disable during async submission |
| Impact | HIGH - Duplicate form submissions, user confusion |
| Detection | Rapid-click testing, network log analysis |
| What NOT to do | Do not change submit handlers without double-submit protection |
| Guardrails | Always disable button immediately on click, re-enable on error |

### REQUIRES LIVE VERIFICATION
This risk is identified from code patterns but needs browser testing to confirm

---

## Phase 2+ Safety Rules

Based on identified risks, the following rules must be followed:

### Before Any CSS Change
1. Capture current screenshots at all breakpoints
2. Verify no horizontal scroll at 320px
3. Test mobile menu open/close
4. Verify CTAs are visible above fold
5. Check LiveChat doesn't cover buttons

### Before Any JS Change
1. Test all form submissions
2. Verify phone validation works
3. Verify email validation works
4. Test questionnaire navigation (all 20 steps)
5. Check console for new errors

### Before Any HTML Change
1. Validate all form field names match backend expectations
2. Verify label-input associations
3. Test accessibility with keyboard navigation
4. Check all internal links work

### Before Any Deploy
1. Run Lighthouse (all key pages)
2. Run axe accessibility check
3. Verify no new console errors
4. Test all forms with valid data
5. Test all forms with invalid data
6. Compare against baseline screenshots
