# Phase 7 Changelog

**Date**: 2026-01-06
**Branch**: `claude/phase-7-seo-final-regression-bi663`

---

## Changes Made

### 1. Canonical Domain Enforcement

- **netlify.toml**: Added www→non-www redirect rule
  ```toml
  [[redirects]]
    from = "https://www.countwize.com/*"
    to = "https://countwize.com/:splat"
    status = 301
    force = true
  ```

### 2. robots.txt Update

- Changed sitemap URL from `https://www.countwize.com/sitemap.xml` to `https://countwize.com/sitemap.xml`

### 3. sitemap.xml Update

- Changed all 15 URLs from `www.countwize.com` to `countwize.com`

### 4. HTML Meta Tag Updates (All 33 pages)

- **Canonical tags**: Changed from `www.countwize.com` to `countwize.com`
- **Meta descriptions**: Added to 11 pages that were missing them
- **og:url**: Added to 21 pages that were missing them
- **og:description**: Verified on all pages
- **og:type**: Verified on all pages
- **twitter:card**: Added to 11 pages that were missing them

### 5. Title Updates

Updated titles on utility/template pages for uniqueness:
- 401.html: "Protected Page | CountWize"
- 404.html: "Page Not Found | CountWize"
- cookie-policy.html: "Cookie Policy | CountWize"
- privacy-policy.html: "Privacy Policy | CountWize"
- recovery-questionnaire.html: "Crypto Recovery Questionnaire | CountWize"
- detail_*.html: Unique titles per template type

### 6. JSON-LD Structured Data

Added to 3 key pages:
- **index.html**: Organization + WebSite schemas
- **contact-us.html**: ContactPage schema
- **recovery-questionnaire.html**: WebPage schema

---

## Files Modified

| File | Change Type | Reason |
|------|-------------|--------|
| netlify.toml | Modified | Added www→non-www redirect |
| robots.txt | Modified | Updated sitemap URL |
| sitemap.xml | Modified | Updated all URLs to non-www |
| *.html (33 files) | Modified | SEO meta tags + canonical fixes |
| index.html | Modified | Added JSON-LD |
| contact-us.html | Modified | Added JSON-LD |
| recovery-questionnaire.html | Modified | Added JSON-LD |

---

## Files Created

| File | Purpose |
|------|---------|
| baseline_phase_7/PHASE_7_REPORT.md | Main report |
| baseline_phase_7/PHASE_7_CHANGELOG.md | This file |
| baseline_phase_7/seo_inventory.csv | SEO audit data |
| baseline_phase_7/seo_rules.md | SEO standards |
| baseline_phase_7/link_audit.md | Internal link verification |
| baseline_phase_7/release_checklist.md | Ship gate checklist |
| baseline_phase_7/rollback_instructions.md | Rollback procedures |
