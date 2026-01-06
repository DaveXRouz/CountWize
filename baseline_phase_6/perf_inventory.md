# Phase 6 Performance Inventory

**Date**: 2026-01-06
**Purpose**: Document largest assets and LCP candidates

---

## Top 25 Largest Files

| Rank | File | Size |
|------|------|------|
| 1 | images/Cta-bg.png | 2.25 MB |
| 2 | images/5.png | 2.11 MB |
| 3 | images/a5100d73025ce0088f7cd7805475c76c95e86663.png | 1.92 MB |
| 4 | documents/COUNTWIZE-ISO-27001-2111-1.pdf | 1.92 MB |
| 5 | images/5-p-2600.png | 1.52 MB |
| 6 | images/3.jpg | 1.50 MB |
| 7 | images/2.jpg | 1.45 MB |
| 8 | images/Cta-bg-p-3200.png | 1.30 MB |
| 9 | images/3-p-3200.jpg | 1.29 MB |
| 10 | images/Services-details.svg | 1.22 MB |
| 11 | images/A-Woman-Siting-with-phone.png | 1.09 MB |
| 12 | images/1.jpg | 1.06 MB |
| 13 | images/4.jpg | 1.05 MB |
| 14 | images/1-p-3200.jpg | 943 KB |
| 15 | images/Cta-bg-p-2600.png | 919 KB |
| 16 | images/5-p-2000.png | 874 KB |
| 17 | images/3-p-2600.jpg | 857 KB |
| 18 | images/Service-Details-Image.svg | 712 KB |
| 19 | images/Team-Details-Bg.svg | 712 KB |
| 20 | images/Project-Details-Image.svg | 712 KB |
| 21 | images/Blog-Details-Top-Bg.svg | 712 KB |
| 22 | images/How-do-you-check-if-a-website-is-legitimate.webp | 705 KB |
| 23 | images/1-p-2600.jpg | 641 KB |
| 24 | images/Blog-Bg-Image.svg | 583 KB |
| 25 | images/Blog-Details--Bg.svg | 582 KB |

---

## LCP Candidates by Page

### Home (index.html)
- **Primary LCP**: `images/Clip-path-group.svg` (hero-logo)
- **Status**: `loading="eager"` + `fetchpriority="high"`

### Contact (contact-us.html)
- **Primary LCP**: `images/Clip-path-group.svg` (hero-logo)
- **Status**: `loading="eager"` + `fetchpriority="high"`

### Questionnaire (recovery-questionnaire.html)
- **Primary LCP**: `images/Clip-path-group.svg` (hero-logo)
- **Status**: `loading="eager"` + `fetchpriority="high"`

### Recovery (recovery.html)
- **Primary LCP**: `images/Clip-path-group.svg` (hero-logo)
- **Status**: `loading="eager"` + `fetchpriority="high"`

---

## Easy Wins (Implemented)

| Optimization | Impact | Status |
|--------------|--------|--------|
| Defer a11y-hardening.js | Reduce main thread | DONE |
| Defer LiveChat init | Reduce main thread | DONE |
| LCP images eager | Faster LCP | DONE |
| decoding="async" | Offload image decode | DONE |
| Resource hints | DNS/connection early | DONE |
| Cache headers | Reduce repeat loads | DONE |

---

## Deferred Items (Phase 7+)

| Optimization | Complexity | Notes |
|--------------|------------|-------|
| Image compression | Medium | 2MB+ images need optimization |
| WebP conversion | Medium | Requires fallbacks |
| Critical CSS | High | Would need extraction tool |
| Code splitting | High | Webflow bundle constraints |
| SVG optimization | Low | Large SVGs could be minified |

---

## Third-Party Resources

| Origin | Usage | Optimization |
|--------|-------|--------------|
| fonts.googleapis.com | Google Fonts | preconnect added |
| fonts.gstatic.com | Google Fonts | preconnect (existing) |
| cdn.livechatinc.com | LiveChat widget | dns-prefetch added, init deferred |
| cdn.embedly.com | Vimeo embeds | In lightbox, lazy by default |
| d3e54v103j8qbb.cloudfront.net | jQuery CDN | Cannot defer (Webflow dep) |
| ajax.googleapis.com | Webfont.js | Cannot defer (render blocking) |
