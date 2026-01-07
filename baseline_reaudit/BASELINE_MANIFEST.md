# CountWize Baseline Manifest
**Generated:** 2026-01-07
**Branch:** claude/countwize-ui-qa-audit-Hcqut
**Purpose:** Rollback safety + deterministic baseline verification

---

## File Hashes (SHA256)

| File | SHA256 | Size | Timestamp |
|------|--------|------|-----------|
| `css/responsive-fixes.css` | `655f2102a2bfc717168074ebdb622ff2b5c056dbfa4e3efa04c56027b3ea140c` | 99,108 bytes | 2026-01-07 14:36 |
| `css/countwize-animations.css` | `4e83c023a5fe0166b3769e3d65244568a70651ee408ccf688c0894b3fce8a5fd` | 11,399 bytes | 2026-01-07 14:36 |
| `netlify.toml` | `bc6ee652b39f25eb6142e3277aba9a79da6860284ede47d2719ac47b6898c467` | 3,238 bytes | 2026-01-07 14:36 |
| `robots.txt` | `34f10a82140be693408452cd18a39ce82191f0af6a88651af9f3b8469dae474c` | 68 bytes | 2026-01-07 14:36 |
| `sitemap.xml` | `0d3769e035f42d41a5dbf5f0de9597da55b3381beec47287ec19dd8347fd9077` | 2,637 bytes | 2026-01-07 14:36 |

---

## Protected Files (DO NOT EDIT)

These files must remain untouched:
- `css/countwize-test.webflow.css` (Webflow generated)
- `js/webflow.js` (Webflow generated)

---

## Current Phase Markers in responsive-fixes.css

```
Line 2690: CW-ALPHA PHASE 2 — POLISH LAYER (DO NOT DELETE)
Line 3195: END CW-ALPHA PHASE 2 — POLISH LAYER
Line 3199: CW-ALPHA PHASE 3 — MOBILE/TABLET HARDENING (DO NOT DELETE)
Line 3718: END CW-ALPHA PHASE 3 — MOBILE/TABLET HARDENING
Line 3722: CW-ALPHA PHASE 4 — FORMS/QUESTIONNAIRE STATES (DO NOT DELETE)
Line 3856: END CW-ALPHA PHASE 4 — FORMS/QUESTIONNAIRE STATES
Line 3860: CW-ALPHA PHASE 5 — ACCESSIBILITY (DO NOT DELETE)
Line 3961: END CW-ALPHA PHASE 5 — ACCESSIBILITY
Line 3965: CW-ALPHA PHASE 6 — PERFORMANCE (DO NOT DELETE)
Line 4035: END CW-ALPHA PHASE 6 — PERFORMANCE
```

---

## JS Modules Present

| Module | Purpose | Include Count |
|--------|---------|---------------|
| `js/a11y-hardening.js` | Accessibility enhancements | 33/33 pages |
| `js/form-hardening.js` | Form validation & security | 4/33 pages (form pages only) |
| `js/perf-deferred-init.js` | Deferred initialization | 33/33 pages |
| `js/webflow.js` | Webflow core (DO NOT EDIT) | N/A |

---

## Inventory Summary

- HTML pages in `/site`: **33**
- HTML pages in root: **33**
- CSS files: **5**
- JS files: **4**
- Deploy directory: `/site`

---

## Rollback Instructions

To revert to this baseline:
1. Restore files from commit `09dbd76`
2. Verify hashes match this manifest
3. Clear Netlify cache after deploy

---

**Manifest checksum:** This document serves as the source of truth for the 2026-01-07 baseline.
