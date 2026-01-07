# CountWize Release Notes v1.0

**Release Date:** 2026-01-07
**Version:** 1.0.0

---

## Overview

CountWize website release with complete Phase 2-8 implementation including UI polish, mobile hardening, form reliability, accessibility, performance optimization, and SEO.

---

## Features

### UI Polish (Phase 2)
- Global focus-visible system for keyboard accessibility
- Consistent button/link hover states
- Typography rhythm standardization
- Card/panel hover consistency
- Logo/platform row protection
- Form visual polish

### Mobile/Tablet Hardening (Phase 3)
- 44px minimum tap targets
- Container padding consistency (16px mobile, 24px tablet)
- Mobile nav z-index hierarchy
- iOS safe-area inset support
- Viewport unit fixes (svh/dvh)
- Overflow prevention

### Forms & Questionnaire (Phase 4)
- Double-submit protection
- 30-second timeout with AbortController
- Email validation before submission
- PII-safe error logging
- Required-step blocking in questionnaire
- aria-invalid field states

### Accessibility (Phase 5)
- Skip link injection
- Landmark roles (navigation, main, contentinfo)
- ARIA attributes on interactive elements
- ESC closes mobile menu
- Form aria-live regions
- Icon-only link labeling
- External link security (rel="noopener noreferrer")

### Performance (Phase 6)
- Deferred third-party widget initialization
- Image loading optimization (decoding="async", lazy/eager)
- LCP image prioritization (fetchpriority="high")
- Safe caching policy (no immutable on non-fingerprinted assets)

### SEO (Phase 7)
- Unique titles and descriptions on all pages
- Non-www canonical URLs
- Complete Open Graph tags
- Twitter card support
- JSON-LD structured data
- XML sitemap with priorities

---

## Technical Details

### Deploy Configuration
- **Publish directory:** `site/`
- **Domain:** https://countwize.com
- **Redirect:** www → non-www (301)

### Caching Policy
| Asset | max-age |
|-------|---------|
| HTML | 3600 (1 hour) |
| CSS/JS/Images | 604800 (1 week) |
| Documents | 2592000 (30 days) |

### Security Headers
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

---

## Files Included

### Core Assets
- 33 HTML pages
- css/ (5 stylesheets)
- js/ (4 scripts)
- images/
- documents/

### Configuration
- netlify.toml
- robots.txt
- sitemap.xml

---

## Rollback

Each phase has marked CSS blocks that can be deleted for rollback:
- Phase 2: Lines 2690-3195
- Phase 3: Lines 3199-3718
- Phase 4: Lines 3722-3856
- Phase 5: Lines 3860-3961
- Phase 6: Lines 3964-4036

---

*Release packaged by AGENT ALPHA*
