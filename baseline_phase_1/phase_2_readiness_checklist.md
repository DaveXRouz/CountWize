# Phase 2 Readiness Checklist
## CountWize - Must Be TRUE Before Any CSS/HTML/JS Edits

---

## Pre-Requisite: Live Browser Testing Required

**IMPORTANT:** This checklist was generated from static code analysis. Before proceeding to Phase 2, the following MUST be completed with actual browser testing:

### Browser Tests Required
- [ ] Screenshots captured at 390px, 768px, 1440px for all key pages
- [ ] Console logs captured (no errors baseline)
- [ ] Network HAR files captured
- [ ] Lighthouse reports generated (mobile + desktop)
- [ ] axe accessibility scan completed
- [ ] All forms tested with valid data
- [ ] All forms tested with invalid data

---

## Baseline Artifacts Checklist

### Folder Structure
- [x] `/baseline_phase_1/` folder exists
- [x] `/baseline_phase_1/screenshots/` folder exists (EMPTY - needs browser capture)
- [x] `/baseline_phase_1/console-logs/` folder exists (EMPTY - needs browser capture)
- [x] `/baseline_phase_1/network-logs/` folder exists (EMPTY - needs browser capture)
- [x] `/baseline_phase_1/forms-evidence/` folder exists
- [x] `/baseline_phase_1/lighthouse/` folder exists (EMPTY - needs browser capture)
- [x] `/baseline_phase_1/accessibility/` folder exists (EMPTY - needs browser capture)
- [x] `/baseline_phase_1/seo/` folder exists

### Documentation Complete
- [x] `baseline_manifest.md` exists with file hashes
- [x] `risk_register.md` exists with 15+ risks identified
- [x] `form_test_matrix.md` documents all 5 forms
- [x] `questionnaire_steps_1-20_notes.md` documents all steps
- [x] `meta_inventory.csv` documents SEO metadata
- [x] `sitemap_robots_snapshot.txt` captures SEO files

### Form Endpoints Mapped
- [x] Home form endpoint identified: telegram-vercel-seven.vercel.app
- [x] Contact form endpoint identified: telegram-vercel-seven.vercel.app
- [x] Questionnaire endpoint identified: telegram-vercel-seven.vercel.app
- [x] Service form endpoint identified: Webflow native
- [x] 401 form endpoint identified: /.wf_auth

### Third-Party Integrations Documented
- [x] Google Analytics tracked (G-0NX03W5PQR)
- [x] Google Ads tracked (AW-447543988)
- [x] LiveChat integration documented
- [x] intl-tel-input library documented (v17.0.12)
- [x] flatpickr library documented
- [x] Cookie consent system documented (EU/non-EU)
- [x] ipapi.co geolocation documented

### Known Issues Documented
- [x] Step 18 heading/question mismatch logged
- [x] Step 19 duplicate label logged
- [x] Missing meta descriptions logged
- [x] Duplicate contact pages logged
- [x] www vs non-www sitemap issue logged

---

## QA Gates Definition

### Gate 1: No New Console Errors
**Baseline:** Capture current console output for Home, Contact, Questionnaire, News
**Pass Criteria:** After changes, no NEW errors appear (existing errors don't count against)
**Test Method:** Open DevTools > Console > Navigate to each page > Compare output

### Gate 2: No Form Double-Submit
**Baseline:** Button should disable on click
**Pass Criteria:** Clicking submit rapidly results in only ONE API request
**Test Method:** Network tab > Submit form > Check request count

### Gate 3: Invalid Phone/Email Never Sends Request
**Baseline:** Validation must block submission
**Pass Criteria:** Invalid email format OR invalid phone NEVER triggers API call
**Test Method:** Enter "test" in email, submit > Check network for NO request

### Gate 4: No Horizontal Scroll at 320px
**Baseline:** Page fits within viewport
**Pass Criteria:** No horizontal scrollbar at 320px width
**Test Method:** DevTools > Device mode > 320px width > Check all key pages

### Gate 5: CLS Not Worse Than Baseline by >10%
**Baseline:** Capture current CLS from Lighthouse
**Pass Criteria:** After changes, CLS does not increase more than 10% from baseline
**Test Method:** Run Lighthouse > Performance > Compare CLS scores

### Gate 6: No New Critical Axe Violations
**Baseline:** Capture current axe results
**Pass Criteria:** Zero NEW critical/serious violations introduced
**Test Method:** Run axe DevTools > Compare violation counts

### Gate 7: Forms Submit Successfully
**Baseline:** All forms work with valid data
**Pass Criteria:** Home, Contact, Questionnaire forms all submit successfully
**Test Method:** Fill forms with valid data > Submit > Verify success state

---

## Rollback Method Confirmed

### Git-Based Rollback
```bash
# To rollback to baseline:
git checkout <baseline-commit-hash>
git push origin main --force  # Only if confident
# OR safer:
git revert <bad-commit-hash>
git push origin main
```

### Netlify-Based Rollback
1. Log into Netlify dashboard
2. Navigate to Deploys
3. Find last known good deploy
4. Click "Publish deploy"

### Baseline Commit
- [ ] Create explicit baseline commit before Phase 2 changes
- [ ] Tag commit as `baseline-phase-1`

---

## Staging Environment Status

| Property | Status |
|----------|--------|
| Staging URL | UNKNOWN |
| Staging matches production | UNKNOWN |
| Can test on staging first | UNKNOWN |

**Recommendation:** Verify with client/team if staging environment exists before Phase 2

---

## Phase 2 Readiness Verdict

### Current Status: PARTIAL - REQUIRES LIVE TESTING

**What's Ready:**
- Code analysis complete
- Risk register created
- Forms documented
- Integrations mapped
- QA gates defined
- Rollback method documented

**What's Missing (BLOCKING):**
- [ ] Visual screenshots (golden set)
- [ ] Console log baselines
- [ ] Lighthouse performance baselines
- [ ] axe accessibility baselines
- [ ] Form submission evidence (success/failure)
- [ ] Live domain redirect verification

---

## Before Starting Phase 2

### Required Actions
1. Complete browser-based testing to fill screenshot/console/HAR gaps
2. Run Lighthouse on all key pages, save HTML reports
3. Run axe on Home, Contact, Questionnaire, save JSON
4. Submit test forms, capture success/failure states
5. Verify www vs non-www redirect behavior
6. Confirm staging environment exists (if any)
7. Create baseline Git tag

### Recommended Order for Phase 2
1. Fix Step 18 heading mismatch (trust issue)
2. Fix Step 19 label duplication (trust issue)
3. Add missing meta descriptions (SEO)
4. Address console errors (if any found in testing)
5. Performance optimizations (guided by Lighthouse)
6. Accessibility fixes (guided by axe)

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Lead | ____________ | ________ | ________ |
| Dev Lead | ____________ | ________ | ________ |
| Product Owner | ____________ | ________ | ________ |

**Phase 2 may begin when all blocking items are resolved and sign-off is obtained.**
