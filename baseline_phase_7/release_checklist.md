# Phase 7 Release Checklist

**Date**: 2026-01-06

---

## Pre-Release Verification

| Check | Status | Notes |
|-------|--------|-------|
| All 33 pages have `<title>` | PASS | Verified |
| All 33 pages have `<meta name="description">` | PASS | Verified |
| All 33 pages have `<link rel="canonical">` | PASS | Non-www domain |
| All canonicals use `https://countwize.com` | PASS | No www |
| All 33 pages have `og:title` | PASS | Verified |
| All 33 pages have `og:description` | PASS | Verified |
| All 33 pages have `og:url` | PASS | Verified |
| All 33 pages have `og:type` | PASS | Verified |
| All 33 pages have `twitter:card` | PASS | Verified |
| robots.txt uses non-www sitemap URL | PASS | Updated |
| sitemap.xml uses non-www URLs | PASS | Updated |
| www→non-www redirect configured | PASS | netlify.toml |
| JSON-LD on key pages | PASS | 3 pages |
| No broken internal links | PASS | Verified |
| Phase 2-6 CSS markers intact | PASS | Verified |
| Script includes correct | PASS | Verified |

---

## Post-Deploy Verification

After deploying to Netlify, manually verify:

1. **Canonical Redirect**
   - Visit https://www.countwize.com
   - Should redirect to https://countwize.com

2. **robots.txt**
   - Visit https://countwize.com/robots.txt
   - Sitemap line should reference non-www

3. **sitemap.xml**
   - Visit https://countwize.com/sitemap.xml
   - All URLs should be non-www

4. **Sample SEO Checks**
   - View source of homepage
   - Confirm canonical, OG tags, twitter cards present

5. **JSON-LD Validation**
   - Use Google Rich Results Test
   - Test index.html, contact-us.html

---

## Ship Gate

| Requirement | Met |
|-------------|-----|
| SEO metadata complete | YES |
| Canonical domain enforced | YES |
| No duplicate canonicals | YES |
| No broken links | YES |
| Cross-phase integrity | YES |
| Documentation complete | YES |

**VERDICT: READY FOR RELEASE**
