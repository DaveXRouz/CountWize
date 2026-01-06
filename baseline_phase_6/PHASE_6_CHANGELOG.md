# Phase 6 Changelog - Performance Quick Wins

## [1.0.0] - 2026-01-06

### Added
- `js/perf-deferred-init.js` - 44-line module for deferred third-party initialization
  - Uses `requestIdleCallback` with `setTimeout` fallback
  - Initializes LiveChat after page load
  - Idempotent with `data-cw-perf-init` guard

- Netlify caching headers in `netlify.toml`:
  - `/documents/*` - 1 year cache, immutable
  - `/*.html` - 1 hour cache, must-revalidate

- Phase 6 CSS block in `css/responsive-fixes.css` (lines 2690-2706)
  - Marker comments only (no CSS traps found to fix)

### Changed
- **All 33 HTML files**:
  - Added `defer` to `a11y-hardening.js` script tag
  - Added `asyncInit = true` to LiveChat config
  - Added `perf-deferred-init.js` script include
  - Added `decoding="async"` to 492 lazy-loaded images
  - Changed hero-logo to `loading="eager"` + `fetchpriority="high"` (13 instances)
  - Changed navbar-logo to `loading="eager"` (33 instances)
  - Added `fonts.googleapis.com` preconnect to 18 pages
  - Added `cdn.livechatinc.com` dns-prefetch to all pages

### Performance Impact
- LiveChat tracking.js now loads after page is interactive
- Hero/LCP images no longer delayed by lazy loading
- Image decoding offloaded from main thread
- DNS resolution for third-party domains starts earlier
- Static assets cached for 1 year

### Not Changed (Verified Safe)
- `js/webflow.js` - untouched
- `css/webflow.css` - untouched
- `css/countwize-test.webflow.css` - untouched
- No global will-change or filter traps found

---

## Branch Information
- **Branch**: `claude/phase-6-performance-quick-wins-bi663`
- **Base**: `claude/phase-5-accessibility-pass-bi663` (commit 8875740)

## Files Modified
1. `netlify.toml` - Added Phase 6 caching headers
2. `css/responsive-fixes.css` - Added Phase 6 CSS block (markers only)
3. `js/perf-deferred-init.js` - NEW: Deferred initialization module
4. All 33 HTML files - Script defer, image attributes, resource hints
5. `baseline_phase_6/` - Documentation

## Commit Summary

```
PH6: Performance Quick Wins - Complete Implementation
- Defer LiveChat init to after page load (asyncInit + perf-deferred-init.js)
- Add defer to a11y-hardening.js
- Optimize LCP: hero/navbar logos to eager + fetchpriority
- Add decoding="async" to 492 lazy images
- Add missing resource hints (preconnect, dns-prefetch)
- Add Netlify caching for documents and HTML
- Add Phase 6 CSS block markers
```
