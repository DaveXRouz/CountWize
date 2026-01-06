# Phase 7 Rollback Instructions

**Date**: 2026-01-06

---

## Quick Rollback

To completely revert Phase 7 changes:

```bash
git checkout claude/phase-6-performance-quick-wins-bi663 -- .
```

---

## Selective Rollbacks

### 1. Revert www→non-www Redirect

Remove from `netlify.toml`:
```toml
[[redirects]]
  from = "https://www.countwize.com/*"
  to = "https://countwize.com/:splat"
  status = 301
  force = true
```

### 2. Revert robots.txt

```bash
git checkout claude/phase-6-performance-quick-wins-bi663 -- robots.txt
```

### 3. Revert sitemap.xml

```bash
git checkout claude/phase-6-performance-quick-wins-bi663 -- sitemap.xml
```

### 4. Revert SEO Meta Changes

```bash
git checkout claude/phase-6-performance-quick-wins-bi663 -- *.html
```

### 5. Remove JSON-LD

Remove the `<script type="application/ld+json">` blocks from:
- index.html
- contact-us.html
- recovery-questionnaire.html

---

## Verification After Rollback

1. Check canonical tags use www.countwize.com
2. Check robots.txt references www.countwize.com
3. Check sitemap.xml uses www.countwize.com
4. Verify no JSON-LD blocks remain

---

## Notes

- Phase 7 changes are additive to head sections
- No structural HTML changes were made
- CSS files were not modified
- JS files were not modified
