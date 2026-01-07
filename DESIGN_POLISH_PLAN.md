# CountWize V3 Design Polish Plan
**Created:** 2026-01-08
**Objective:** Achieve visual harmony, consistency, and professional polish across the entire site

---

## Executive Summary

The audit revealed **critical design inconsistencies** that make the site feel unpolished:
- **25+ font sizes** instead of a 7-step scale
- **40+ padding/margin values** instead of an 8px grid system
- **15+ border-radius values** with no semantic meaning
- **20+ z-index values** creating layering chaos
- **6+ card patterns** with no shared base styles
- **Multiple button hover patterns** (translateY, scale, combined)
- **Color variations** (6+ dark colors, 5+ greens)
- **Responsive bugs** (100vw overflow, z-index conflicts)

---

## Design System Foundation (Must Create First)

Before fixing individual issues, we need a **design tokens file** that defines all scales:

```css
/* site/css/design-tokens.css */
:root {
  /* Typography Scale (1.25 ratio) */
  --font-xs: 0.75rem;    /* 12px */
  --font-sm: 0.875rem;   /* 14px */
  --font-base: 1rem;     /* 16px */
  --font-md: 1.25rem;    /* 20px */
  --font-lg: 1.5rem;     /* 24px */
  --font-xl: 2rem;       /* 32px */
  --font-2xl: 2.5rem;    /* 40px */
  --font-3xl: 3rem;      /* 48px */
  --font-4xl: 3.75rem;   /* 60px */

  /* Spacing Scale (8px base) */
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.5rem;     /* 24px */
  --space-6: 2rem;       /* 32px */
  --space-7: 2.5rem;     /* 40px */
  --space-8: 3rem;       /* 48px */
  --space-9: 4rem;       /* 64px */
  --space-10: 5rem;      /* 80px */

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.25);
  --shadow-glow: 0 0 20px rgba(163, 220, 173, 0.3);

  /* Colors - Primary */
  --color-primary: #34D399;
  --color-primary-light: #6EE7B7;
  --color-primary-dark: #059669;
  --color-primary-muted: #aec3b0;

  /* Colors - Background */
  --color-bg-base: #050b0c;
  --color-bg-elevated: #0a1214;
  --color-bg-surface: #121a1c;
  --color-bg-overlay: rgba(5, 11, 12, 0.95);

  /* Colors - Text */
  --color-text-primary: #ffffff;
  --color-text-secondary: rgba(255, 255, 255, 0.7);
  --color-text-muted: rgba(255, 255, 255, 0.5);

  /* Colors - Border */
  --color-border-default: rgba(163, 220, 173, 0.2);
  --color-border-hover: rgba(163, 220, 173, 0.4);
  --color-border-focus: rgba(163, 220, 173, 0.6);

  /* Colors - State */
  --color-error: #ef4444;
  --color-success: #22c55e;
  --color-warning: #f59e0b;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 400ms ease;
  --transition-bounce: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Z-Index Scale */
  --z-base: 1;
  --z-dropdown: 100;
  --z-sticky: 500;
  --z-fixed: 1000;
  --z-modal-backdrop: 1500;
  --z-modal: 2000;
  --z-popover: 2500;
  --z-tooltip: 3000;
  --z-toast: 9000;
  --z-max: 9999;
}
```

---

## PHASE 1: Foundation & Critical Fixes (P0)
**Goal:** Fix breaking issues and establish design system

### TASK 1.1: Create Design Tokens File
- **Location:** `site/css/design-tokens.css`
- **Action:** Create new file with all CSS custom properties above
- **Link:** Add `<link>` to all HTML files before other CSS
- **Pass/Fail:** Variables accessible in browser DevTools

### TASK 1.2: Fix Horizontal Scroll Bug
- **Location:** `site/css/responsive-fixes.css`
- **Issue:** `max-width: 100vw` causes scroll (100vw includes scrollbar)
- **Fix:** Replace all `100vw` with `100%` for width constraints
- **Lines:** 11-12, 18-19, 240, 720, 1668, 1788
- **Pass/Fail:** No horizontal scroll at any viewport width

### TASK 1.3: Fix Z-Index Hierarchy
- **Location:** `site/css/responsive-fixes.css`
- **Issue:** Mobile nav (999) behind header (1000)
- **Fix:** Implement z-index scale from design tokens
- **Current Chaos:**
  - Base content: 1
  - Header: 1000
  - Mobile nav: 999 (WRONG - should be above header)
  - Cookie banner: 9000
  - LiveChat: 9500
- **New Hierarchy:**
  - Base: var(--z-base)
  - Dropdown: var(--z-dropdown)
  - Sticky header: var(--z-sticky)
  - Fixed nav: var(--z-fixed)
  - Mobile menu overlay: var(--z-modal)
  - Cookie banner: var(--z-toast)
  - LiveChat: var(--z-max)
- **Pass/Fail:** Mobile menu clickable when open

### TASK 1.4: Fix Touch Target Sizes
- **Location:** `site/css/responsive-fixes.css`
- **Issue:** Checkboxes/radios only 20px (WCAG requires 24px min)
- **Lines:** 1872-1876
- **Fix:** Set min-width/height to 24px
- **Pass/Fail:** All interactive elements ≥44px touch target

---

## PHASE 2: Typography Harmony (P1)
**Goal:** Reduce 25+ font sizes to 9-step scale

### TASK 2.1: Audit Current Font Sizes
- **Location:** All CSS files
- **Action:** Document every font-size declaration
- **Output:** Mapping table: old value → new token

### TASK 2.2: Normalize Heading Sizes
- **Location:** `site/css/responsive-fixes.css` (add new section)
- **Current Issues:**
  - h1: 62px, 54px, 46px, 40px (4 breakpoints - OK but arbitrary)
  - h2: 42px, 38px, 32px, 27px (inconsistent scaling)
  - h3: 32px, 24px, 21px, 19px (19px too small on mobile)
- **New Scale (using 1.25 ratio):**
  ```
  Desktop:  h1=3.75rem(60px) h2=2.5rem(40px) h3=1.5rem(24px)
  Tablet:   h1=3rem(48px)    h2=2rem(32px)   h3=1.25rem(20px)
  Mobile:   h1=2.5rem(40px)  h2=1.5rem(24px) h3=1.125rem(18px)
  ```
- **Pass/Fail:** All headings use design token values

### TASK 2.3: Normalize Body Text
- **Location:** `site/css/responsive-fixes.css`
- **Current Issues:**
  - Base text: 1rem (good)
  - Small text: 14px, 13px, 12px (inconsistent)
  - Large text: 17px, 18px, 19px, 20px (inconsistent)
- **New Scale:**
  ```
  --font-xs: 12px (captions, labels)
  --font-sm: 14px (secondary text)
  --font-base: 16px (body)
  --font-md: 20px (lead paragraphs)
  ```
- **Pass/Fail:** No arbitrary font sizes in body text

### TASK 2.4: Normalize Line Heights
- **Location:** All CSS files
- **Issue:** Mixed px (44px, 36px) and unitless (1.3, 1.5, 1.6)
- **Fix:** Standardize on unitless values
  ```
  Headings: 1.2
  Body: 1.6
  Tight: 1.3
  Loose: 1.8
  ```
- **Pass/Fail:** No px-based line-heights remain

---

## PHASE 3: Spacing Consistency (P1)
**Goal:** Reduce 40+ spacing values to 10-step scale

### TASK 3.1: Audit Current Spacing
- **Location:** All CSS files
- **Action:** Document every padding/margin/gap value
- **Output:** Mapping table: old value → new token

### TASK 3.2: Normalize Section Padding
- **Location:** `site/css/responsive-fixes.css`
- **Current Issues:**
  - Desktop: 80px (good, matches --space-10)
  - Tablet: 64px (good, matches --space-9)
  - Mobile: 48px (good, matches --space-8)
  - But also: 30px, 100px, 115px, 120px, 140px scattered
- **Fix:** Replace all with design tokens
- **Pass/Fail:** Section padding uses only token values

### TASK 3.3: Normalize Component Padding
- **Location:** `site/css/responsive-fixes.css`
- **Current Issues:**
  - Buttons: 8px 16px, 12px 20px, 12px 24px (inconsistent)
  - Cards: 16px, 20px, 24px, 32px (multiple patterns)
  - Form fields: 9px 15px, 8px 16px (inconsistent)
- **Fix:** Define component-specific tokens
  ```
  --btn-padding-sm: var(--space-2) var(--space-4);  /* 8px 16px */
  --btn-padding-md: var(--space-3) var(--space-5);  /* 12px 24px */
  --btn-padding-lg: var(--space-4) var(--space-6);  /* 16px 32px */
  --card-padding: var(--space-5);                    /* 24px */
  --input-padding: var(--space-3) var(--space-4);   /* 12px 16px */
  ```
- **Pass/Fail:** Components use token-based padding

### TASK 3.4: Normalize Gap Values
- **Location:** `site/css/responsive-fixes.css`
- **Current Issues:** 16px, 20px, 24px, 32px mixed
- **Fix:** Use only: 16px (--space-4), 24px (--space-5), 32px (--space-6)
- **Pass/Fail:** All gap values use design tokens

---

## PHASE 4: Color Consolidation (P1)
**Goal:** Reduce color variations to single palette

### TASK 4.1: Consolidate Dark Background Colors
- **Current Issues:**
  - #1a1a1a, #090910, #121218, #040a07, #050b0c (5+ variants)
- **Fix:** Use only:
  ```
  --color-bg-base: #050b0c      (darkest, body)
  --color-bg-elevated: #0a1214  (cards, elevated surfaces)
  --color-bg-surface: #121a1c   (inputs, interactive areas)
  ```
- **Pass/Fail:** No hex dark colors remain; all use tokens

### TASK 4.2: Consolidate Green Colors
- **Current Issues:**
  - #34D399, #079c41, #aec3b0, #07b96a, rgba(163, 220, 173, x)
- **Fix:** Use only:
  ```
  --color-primary: #34D399      (main accent)
  --color-primary-dark: #059669 (hover states)
  --color-primary-muted: #aec3b0 (borders, subtle)
  ```
- **Pass/Fail:** All greens use design tokens

### TASK 4.3: Consolidate Border Colors
- **Current Issues:**
  - rgba(163, 220, 173, 0.1), 0.15, 0.2, 0.25, 0.3, 0.4, 0.6
- **Fix:** Use only:
  ```
  --color-border-default: rgba(163, 220, 173, 0.2)
  --color-border-hover: rgba(163, 220, 173, 0.4)
  --color-border-focus: rgba(163, 220, 173, 0.6)
  ```
- **Pass/Fail:** All borders use 3-tier system

---

## PHASE 5: Border Radius Standardization (P2)
**Goal:** Reduce 15+ radius values to 6-step scale

### TASK 5.1: Map Current Radii to New Scale
- **Current Issues:**
  - 3px, 4px, 6px, 8px, 10px, 12px, 13px, 15px, 20px, 3.75rem
- **New Scale:**
  ```
  --radius-sm: 4px    (small buttons, tags)
  --radius-md: 8px    (buttons, inputs)
  --radius-lg: 12px   (cards, modals)
  --radius-xl: 16px   (large cards)
  --radius-2xl: 24px  (hero sections)
  --radius-full: 9999px (pills, avatars)
  ```
- **Pass/Fail:** All border-radius use tokens

### TASK 5.2: Apply Semantic Radius
- **Mapping:**
  - Buttons: --radius-md (8px)
  - Inputs: --radius-md (8px)
  - Cards: --radius-lg (12px)
  - Modals: --radius-xl (16px)
  - Pills/Tags: --radius-full
- **Pass/Fail:** Same component type uses same radius

---

## PHASE 6: Shadow Consistency (P2)
**Goal:** Reduce 10+ shadow variations to 5-step scale

### TASK 6.1: Define Shadow Scale
- **New Scale:**
  ```
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1)
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15)
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2)
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.25)
  --shadow-glow: 0 0 20px rgba(163, 220, 173, 0.3)
  ```

### TASK 6.2: Apply to Components
- **Mapping:**
  - Default cards: none
  - Hover cards: --shadow-lg
  - Elevated cards: --shadow-md
  - Modals: --shadow-xl
  - Glow effects: --shadow-glow
- **Pass/Fail:** All shadows use design tokens

---

## PHASE 7: Transition Standardization (P2)
**Goal:** Reduce 7+ durations to 4-step scale

### TASK 7.1: Define Transition Scale
- **Current Issues:** 0.15s, 0.2s, 0.25s, 0.3s, 0.4s, 0.5s, 0.6s
- **New Scale:**
  ```
  --transition-fast: 150ms ease      (micro-interactions)
  --transition-normal: 250ms ease    (button hovers)
  --transition-slow: 400ms ease      (page transitions)
  --transition-bounce: 400ms cubic-bezier(0.34, 1.56, 0.64, 1)
  ```

### TASK 7.2: Apply to Interactions
- **Mapping:**
  - Color/opacity changes: --transition-fast
  - Transform/position: --transition-normal
  - Large reveals: --transition-slow
  - Playful interactions: --transition-bounce
- **Pass/Fail:** All transitions use design tokens

---

## PHASE 8: Button Harmonization (P1)
**Goal:** Unify button styles and hover behaviors

### TASK 8.1: Define Button Base Styles
- **Create in responsive-fixes.css:**
  ```css
  /* Button Base */
  .cw-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    font-weight: 600;
    border-radius: var(--radius-md);
    transition: var(--transition-normal);
    cursor: pointer;
  }

  /* Size Variants */
  .cw-btn-sm { padding: var(--space-2) var(--space-4); font-size: var(--font-sm); }
  .cw-btn-md { padding: var(--space-3) var(--space-5); font-size: var(--font-base); }
  .cw-btn-lg { padding: var(--space-4) var(--space-6); font-size: var(--font-md); min-height: 48px; }

  /* Style Variants */
  .cw-btn-primary {
    background: var(--color-primary);
    color: var(--color-bg-base);
  }
  .cw-btn-primary:hover {
    background: var(--color-primary-light);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .cw-btn-outline {
    background: transparent;
    border: 1px solid var(--color-border-default);
    color: var(--color-text-primary);
  }
  .cw-btn-outline:hover {
    border-color: var(--color-border-hover);
    background: var(--color-bg-elevated);
  }
  ```

### TASK 8.2: Standardize Hover Behaviors
- **Current Issues:**
  - translateY(-1px), translateY(-2px), translateY(-4px)
  - scale(1.01), scale(1.05)
  - Combined: translateY(-2px) scale(1.01)
- **Fix:** Single pattern per context
  ```
  Buttons: translateY(-2px) + shadow
  Cards: translateY(-4px) + shadow
  Small interactive: scale(1.02)
  ```
- **Pass/Fail:** Consistent hover behavior per component type

---

## PHASE 9: Card Harmonization (P1)
**Goal:** Unify 6+ card patterns to 2-3 base styles

### TASK 9.1: Define Card Base Styles
- **Create in responsive-fixes.css:**
  ```css
  /* Card Base */
  .cw-card {
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    transition: var(--transition-normal);
  }

  .cw-card:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  /* Card Variants */
  .cw-card-flat {
    background: transparent;
    border: none;
    padding: var(--space-4);
  }

  .cw-card-featured {
    background: linear-gradient(135deg, var(--color-bg-elevated), var(--color-bg-surface));
    border-color: var(--color-primary-muted);
  }
  ```

### TASK 9.2: Map Existing Cards to Base Styles
- **Mapping:**
  - `.card` → `.cw-card`
  - `.pricing-card` → `.cw-card-featured`
  - `.blog-article-card` → `.cw-card`
  - `.services-overview-card` → `.cw-card`
- **Pass/Fail:** All cards share base styling

---

## PHASE 10: Form Field Harmonization (P1)
**Goal:** Unify input styles across all forms

### TASK 10.1: Define Input Base Styles
- **Current Issues:**
  - `.hero-input`, `.input`, `.input-new`, `.text-field-2` (4 classes!)
- **Fix:** Single input style
  ```css
  .cw-input {
    width: 100%;
    padding: var(--space-3) var(--space-4);
    font-size: var(--font-base);
    color: var(--color-text-primary);
    background: var(--color-bg-surface);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-md);
    transition: var(--transition-fast);
  }

  .cw-input:hover {
    border-color: var(--color-border-hover);
  }

  .cw-input:focus {
    border-color: var(--color-border-focus);
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .cw-input::placeholder {
    color: var(--color-text-muted);
  }
  ```

### TASK 10.2: Fix Placeholder Contrast
- **Issue:** 50% opacity on dark background fails WCAG
- **Fix:** Use `--color-text-secondary` (70% opacity) minimum
- **Pass/Fail:** Placeholder contrast ≥4.5:1

### TASK 10.3: Fix Label Mismatches
- **Already done in V2:** investment-input, specialist-input
- **Remaining:** Ensure all form fields have proper labels or aria-labels
- **Pass/Fail:** No form field without accessible name

---

## PHASE 11: Responsive Fixes (P1)
**Goal:** Fix mobile-specific issues

### TASK 11.1: Fix Container Width Jump
- **Issue:** Jump from 728px to "none" at 767px
- **Fix:** Gradual scaling
  ```css
  @media (max-width: 767px) {
    .w-layout-blockcontainer {
      max-width: 100%;
      padding-left: var(--space-4);
      padding-right: var(--space-4);
    }
  }
  ```

### TASK 11.2: Fix Fixed-Width Elements
- **Issue:** Utility page 530px at 767px overflows small phones
- **Fix:** Use max-width: 100%
- **Issue:** 900px fixed-width images
- **Fix:** max-width: 100%; height: auto;

### TASK 11.3: Add 360px Breakpoint Handling
- **Issue:** Missing clamp() at 479px, only at 360px
- **Fix:** Use clamp() from 479px down
  ```css
  @media (max-width: 479px) {
    h1 { font-size: clamp(1.75rem, 8vw, 2.5rem); }
    h2 { font-size: clamp(1.25rem, 6vw, 1.5rem); }
  }
  ```

---

## PHASE 12: HTML Consistency Fixes (P2)
**Goal:** Fix structural inconsistencies across pages

### TASK 12.1: Fix Contact URL Mismatch
- **Issue:** `contact.html` vs `contact-us.html` in links
- **Fix:** Standardize all to `contact-us.html`
- **Files:** All HTML files with contact links

### TASK 12.2: Fix Privacy Policy URL Format
- **Issue:** `/privacy-policy` vs `privacy-policy.html`
- **Fix:** Use `privacy-policy.html` (matches actual file)
- **Files:** Footer links in all pages

### TASK 12.3: Remove Hidden opacity:0 Elements
- **Issue:** Elements with `style="opacity:0"` still in DOM
- **Fix:** Use `display: none` or remove entirely
- **Files:** index.html, blog.html, about-us.html

### TASK 12.4: Fix Generic Class Names
- **Issue:** `.div-block-152`, `._70` (meaningless)
- **Fix:** Rename to semantic names or add comment explaining purpose

---

## PHASE 13: Accessibility Polish (P2)
**Goal:** Ensure WCAG AA compliance

### TASK 13.1: Improve Focus Indicators
- **Issue:** Custom focus styles may be imperceptible
- **Fix:** Ensure 3:1 contrast minimum, 2px outline minimum
  ```css
  :focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  ```

### TASK 13.2: Fix Radio Button Accessibility
- **Issue:** `opacity:0; position:absolute; z-index:-1` hides inputs
- **Fix:** Use `.sr-only` class instead, ensure still focusable

### TASK 13.3: Improve Contrast Ratios
- **Issue:** Placeholder text at 50% opacity
- **Fix:** Minimum 60% opacity for 4.5:1 contrast

---

## PHASE 14: Animation Polish (P2)
**Goal:** Consistent, performant animations

### TASK 14.1: Add prefers-reduced-motion
- **Already present in countwize-animations.css** but verify coverage
- **Check:** All transform/animation respects user preference

### TASK 14.2: Ensure GPU-Accelerated Properties
- **Good:** transform, opacity (already used)
- **Avoid:** Animating width, height, top, left, padding, margin

---

## PHASE 15: Final Verification (P0)
**Goal:** Ensure all changes work together

### TASK 15.1: Cross-Browser Testing
- **Browsers:** Chrome, Firefox, Safari, Edge
- **Devices:** Desktop, tablet, mobile

### TASK 15.2: Lighthouse Audit
- **Targets:**
  - Performance: 90+
  - Accessibility: 100
  - Best Practices: 90+
  - SEO: 100

### TASK 15.3: Visual Regression Check
- **Pages to check:**
  - index.html
  - recovery.html
  - recovery-questionnaire.html
  - contact-us.html
  - about-us.html
  - blog.html

### TASK 15.4: Update Drift Check Script
- **Add:** design-tokens.css to sync check
- **Run:** `node scripts/check-deploy-drift.mjs`

---

## Execution Priority

| Phase | Priority | Est. Impact | Risk |
|-------|----------|-------------|------|
| 1. Foundation | P0 | Critical | Low |
| 2. Typography | P1 | High | Medium |
| 3. Spacing | P1 | High | Medium |
| 4. Colors | P1 | High | Low |
| 8. Buttons | P1 | High | Low |
| 9. Cards | P1 | High | Medium |
| 10. Forms | P1 | High | Medium |
| 11. Responsive | P1 | High | Medium |
| 5. Border Radius | P2 | Medium | Low |
| 6. Shadows | P2 | Medium | Low |
| 7. Transitions | P2 | Medium | Low |
| 12. HTML | P2 | Medium | Low |
| 13. Accessibility | P2 | Medium | Low |
| 14. Animation | P2 | Low | Low |
| 15. Verification | P0 | Critical | Low |

---

## Success Criteria

The site is "designer-approved" when:

- [ ] Design tokens file exists and is linked to all pages
- [ ] No horizontal scroll at any viewport (320px - 2560px)
- [ ] Mobile menu is clickable (z-index fixed)
- [ ] All touch targets ≥44px
- [ ] Typography uses 9-step scale only
- [ ] Spacing uses 10-step scale only
- [ ] Colors use design token palette only
- [ ] Border-radius uses 6-step scale only
- [ ] Shadows use 5-step scale only
- [ ] Transitions use 4-step scale only
- [ ] All buttons follow unified hover pattern
- [ ] All cards share base styling
- [ ] All form inputs share base styling
- [ ] All URLs are consistent (no contact.html vs contact-us.html)
- [ ] Lighthouse Accessibility: 100
- [ ] No WCAG AA violations

---

*This plan should be executed phase by phase, with verification after each phase before proceeding.*
