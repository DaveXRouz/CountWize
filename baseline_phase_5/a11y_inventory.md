# Phase 5 Accessibility Inventory

**Date**: 2026-01-06
**Purpose**: Maps each accessibility requirement to implementing file(s) and selectors

---

## Requirements Mapping

| Requirement ID | Description | File(s) | Selector/Function |
|----------------|-------------|---------|-------------------|
| PH5-001 | Skip link injection | `js/a11y-hardening.js` | `injectSkipLink()`, `.skip-link` |
| PH5-002 | Main content target | `js/a11y-hardening.js` | `ensureMainContentTarget()`, `#main-content` |
| PH5-003 | lang="en" attribute | All 33 HTML pages | `<html lang="en">` (pre-existing) |
| PH5-004 | Landmark roles | `js/a11y-hardening.js` | `ensureLandmarks()` |
| PH5-005 | Menu button aria-label | `js/a11y-hardening.js` | `enhanceNavAccessibility()`, `.w-nav-button` |
| PH5-006 | Menu aria-expanded sync | `js/a11y-hardening.js` | MutationObserver on `.w--open` |
| PH5-007 | ESC closes menu | `js/a11y-hardening.js` | `keydown` listener for Escape |
| PH5-008 | Form aria-live regions | `js/a11y-hardening.js` | `enhanceFormRegions()`, `.w-form-done`, `.w-form-fail` |
| PH5-009 | aria-required on fields | `js/a11y-hardening.js` | `enhanceRequiredFields()`, `[required]` |
| PH5-010 | autocomplete attributes | `js/a11y-hardening.js` | `addAutocomplete()` |
| PH5-011 | aria-invalid sync | `js/a11y-hardening.js` | `syncAriaInvalid()` API |
| PH5-012 | Icon-only link labels | `js/a11y-hardening.js` | `labelIconLinks()` |
| PH5-013 | Reduced motion CSS | `css/responsive-fixes.css` | `@media (prefers-reduced-motion: reduce)` |
| PH5-014 | External link security | `js/a11y-hardening.js` | `secureExternalLinks()`, `target="_blank"` |

---

## CSS Selectors (Phase 5 Block)

| Selector | Purpose | Lines |
|----------|---------|-------|
| `.skip-link` | Hidden skip link styling | 2597-2611 |
| `.skip-link:focus` | Visible skip link on focus | 2613-2617 |
| `#main-content:focus` | No outline on main target | 2619-2622 |
| `.cw-keyboard-nav *:focus` | Enhanced focus for keyboard users | 2624-2633 |
| `*:focus-visible` | Modern focus indicator | 2635-2644 |
| `@media (prefers-reduced-motion)` | Reduced motion support | 2646-2663 |
| `input/select/textarea:focus` | Form focus states | 2665-2671 |
| `.w-nav-button:focus` | Nav button focus | 2673-2678 |
| `.w-dropdown-toggle:focus` | Dropdown focus | 2680-2684 |

---

## JS Functions (a11y-hardening.js)

| Function | Purpose | Line |
|----------|---------|------|
| `injectSkipLink()` | Inject skip link if missing | 16 |
| `ensureMainContentTarget()` | Create main-content target | 34 |
| `ensureLandmarks()` | Add landmark roles | 69 |
| `enhanceNavAccessibility()` | Nav ARIA + ESC handler | 103 |
| `enhanceFormRegions()` | aria-live on form messages | 170 |
| `enhanceRequiredFields()` | aria-required on [required] | 191 |
| `addAutocomplete()` | autocomplete attributes | 203 |
| `syncAriaInvalid()` | Update aria-invalid state | 256 |
| `labelIconLinks()` | aria-label for icon links | 265 |
| `secureExternalLinks()` | rel="noopener noreferrer" | 302 |
| `enhanceFocusIndicators()` | Keyboard nav tracking | 321 |
| `init()` | Initialize all enhancements | 341 |

---

## Coverage Summary

| Metric | Count |
|--------|-------|
| HTML pages | 33 |
| Script includes | 33/33 (100%) |
| lang attribute | 33/33 (100%) |
| Skip link (via JS) | 33/33 (100%) |
| Main content (via JS) | 33/33 (100%) |
| target="_blank" links | 363 (all secured by JS) |
