# Phase 6 Rollback Instructions

**Date**: 2026-01-06
**Purpose**: Step-by-step guide to fully reverse Phase 6 changes

---

## Quick Rollback (Full Revert)

If you need to completely revert Phase 6:

```bash
# From the repo root
git checkout 8875740 -- .
git checkout HEAD -- baseline_phase_6/  # Keep docs for reference
```

---

## Selective Rollback

### 1. Remove Deferred Init Module

```bash
# Remove the JS file
rm js/perf-deferred-init.js

# Remove script includes from all pages
sed -i '/perf-deferred-init.js/d' *.html
```

### 2. Remove defer from a11y-hardening.js

```bash
sed -i 's/a11y-hardening.js" defer/a11y-hardening.js"/g' *.html
```

### 3. Remove LiveChat asyncInit

```bash
sed -i '/asyncInit = true/d' *.html
```

### 4. Restore Image Attributes

```bash
# Restore lazy loading to hero logos
sed -i 's/loading="eager" fetchpriority="high" alt="Logo" height="54"/loading="lazy" alt="Logo" height="54"/g' *.html

# Restore lazy loading to navbar logos
sed -i 's/loading="eager" alt="Logo" height="25"/loading="lazy" alt="Logo" height="25"/g' *.html

# Remove decoding="async" from images
sed -i 's/ decoding="async"//g' *.html
```

### 5. Remove Resource Hints

```bash
# Remove LiveChat dns-prefetch
sed -i '/cdn.livechatinc.com.*dns-prefetch/d' *.html

# Note: fonts.googleapis.com preconnect should remain (existed before Phase 6 on some pages)
```

### 6. Remove Netlify Caching Headers

Edit `netlify.toml` and remove lines 154-164:

```toml
# Phase 6: Additional caching headers  <-- DELETE FROM HERE
[[headers]]
  for = "/documents/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# HTML pages: short cache for freshness
[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=3600, must-revalidate"
                                          <-- TO HERE
```

### 7. Remove Phase 6 CSS Block

Edit `css/responsive-fixes.css` and remove lines 2690-2706:

```css
/* =========================================================   <-- DELETE FROM HERE
   CW-ALPHA PHASE 6 — PERFORMANCE QUICK WINS (DO NOT DELETE)
   ...
   END CW-ALPHA PHASE 6 — PERFORMANCE QUICK WINS (DO NOT DELETE)
   ========================================================= */ <-- TO HERE
```

---

## Verification After Rollback

```bash
# Verify no Phase 6 traces
grep -r "perf-deferred-init" *.html     # Should return nothing
grep -r "asyncInit" *.html              # Should return nothing
grep -r "fetchpriority" *.html          # Should return nothing
grep "CW-ALPHA PHASE 6" css/responsive-fixes.css  # Should return nothing
ls js/perf-deferred-init.js             # Should fail (file not found)
```

---

## Emergency Contact

If rollback causes issues, check:
1. Webflow.js still loads without defer (required)
2. jQuery loads before webflow.js (required)
3. LiveChat still initializes (check browser console)
4. Images still load (check Network tab)
