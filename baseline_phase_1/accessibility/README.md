# Accessibility Reports Directory
## Phase 1 Baseline - BROWSER TESTING REQUIRED

This folder should contain axe accessibility reports:
- axe_home.json
- axe_contact.json
- axe_questionnaire.json

## Tools

### Primary: axe DevTools
- Browser extension or npm package
- Outputs JSON with violations

### Alternative: Lighthouse Accessibility
- Use if axe not available
- Mark reports as "Lighthouse A11y" to distinguish

## What to Test

### Keyboard Navigation
- [ ] Can tab through all nav links
- [ ] Can tab through all form fields
- [ ] Focus is visible on all interactive elements
- [ ] No keyboard traps (menus, modals, lightboxes)
- [ ] Can submit forms via Enter key

### Screen Reader Compatibility
- [ ] All images have alt text
- [ ] Form labels properly associated
- [ ] Heading hierarchy logical (h1 > h2 > h3)
- [ ] ARIA attributes used correctly

### Visual
- [ ] Color contrast meets WCAG AA
- [ ] Text readable at 200% zoom
- [ ] No content lost at 320px width

## How to Capture

### Using axe DevTools Extension
1. Open Chrome > Extensions > axe DevTools
2. Navigate to page
3. Run scan
4. Export JSON

### Using axe-core programmatically
```javascript
const results = await axe.run();
fs.writeFileSync('axe_home.json', JSON.stringify(results, null, 2));
```

## Known A11y Issues from Code Analysis

| Issue | Page | Severity |
|-------|------|----------|
| Missing label association | questionnaire step 19 | Serious |
| Heading/content mismatch | questionnaire step 18 | Moderate |
| Potential missing alt text | Various images | Needs verification |
| Focus state visibility | All interactive elements | Needs verification |

## Status
**BLOCKED** - axe-core execution attempted 2026-01-06 but network blocked (ERR_TUNNEL_CONNECTION_FAILED).

JSON report files exist but contain `{"error": "page_not_accessible"}`.
See `PHASE_1B_EXECUTION_REPORT.md` for details.

Re-run required on machine with unrestricted network access.
