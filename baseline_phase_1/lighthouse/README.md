# Lighthouse Reports Directory
## Phase 1 Baseline - BROWSER TESTING REQUIRED

This folder should contain Lighthouse reports:
- home_mobile.html + home_desktop.html
- contact_mobile.html + contact_desktop.html
- questionnaire_mobile.html + questionnaire_desktop.html

## Metrics to Capture

### Core Web Vitals
- LCP (Largest Contentful Paint)
- FID (First Input Delay) / INP (Interaction to Next Paint)
- CLS (Cumulative Layout Shift)

### Performance Score
- Target: >50 mobile, >70 desktop
- Record opportunities for improvement

### Accessibility Score
- Target: >80
- Record all violations

## How to Capture

### Using Chrome DevTools
1. Open DevTools > Lighthouse
2. Select Mobile or Desktop
3. Check: Performance, Accessibility, Best Practices, SEO
4. Generate report
5. Save HTML

### Using CLI
```bash
npx lighthouse https://countwize.com --output html --output-path ./home_mobile.html --emulated-form-factor mobile
npx lighthouse https://countwize.com --output html --output-path ./home_desktop.html --emulated-form-factor desktop
```

## Baseline Metrics to Document

| Page | Device | Perf | A11y | BP | SEO | LCP | CLS |
|------|--------|------|------|-----|-----|-----|-----|
| Home | Mobile | ? | ? | ? | ? | ? | ? |
| Home | Desktop | ? | ? | ? | ? | ? | ? |
| Contact | Mobile | ? | ? | ? | ? | ? | ? |
| Contact | Desktop | ? | ? | ? | ? | ? | ? |
| Questionnaire | Mobile | ? | ? | ? | ? | ? | ? |
| Questionnaire | Desktop | ? | ? | ? | ? | ? | ? |

## Status
**PENDING** - Lighthouse reports not yet generated (CLI analysis only)
