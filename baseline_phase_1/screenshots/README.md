# Screenshots Directory
## Phase 1 Baseline - BROWSER TESTING REQUIRED

This folder should contain visual screenshots at the following breakpoints:
- Mobile: 390x844 (iPhone 12/13), 360x800 (Android)
- Tablet: 768x1024
- Desktop: 1440x900

## Required Screenshots

### Home Page (/)
- [ ] home_desktop_abovefold.png
- [ ] home_tablet_abovefold.png
- [ ] home_mobile_abovefold.png
- [ ] home_desktop_midpage.png
- [ ] home_tablet_midpage.png
- [ ] home_mobile_midpage.png
- [ ] footer_home_mobile.png

### Recovery Page (/recovery)
- [ ] recovery_desktop_abovefold.png
- [ ] recovery_tablet_abovefold.png
- [ ] recovery_mobile_abovefold.png
- [ ] footer_recovery_mobile.png

### Contact Page (/contact-us)
- [ ] contact_desktop_abovefold.png
- [ ] contact_tablet_abovefold.png
- [ ] contact_mobile_abovefold.png
- [ ] footer_contact_mobile.png

### Questionnaire (/recovery-questionnaire)
- [ ] questionnaire_desktop_abovefold.png
- [ ] questionnaire_tablet_abovefold.png
- [ ] questionnaire_mobile_abovefold.png
- [ ] questionnaire_step18_heading.png (evidence of mismatch)
- [ ] questionnaire_step19_labels.png (evidence of duplicate)
- [ ] footer_questionnaire_mobile.png

### News Page (/news)
- [ ] news_desktop_abovefold.png
- [ ] news_tablet_abovefold.png
- [ ] news_mobile_abovefold.png
- [ ] footer_news_mobile.png

## How to Capture

### Using Chrome DevTools
1. Open Chrome DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Select viewport size
4. Capture screenshot (Ctrl+Shift+P > "Capture screenshot")

### Using Playwright/Puppeteer
```javascript
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: 'home_mobile_abovefold.png' });
```

## Status
**PENDING** - Screenshots not yet captured (CLI analysis only)
