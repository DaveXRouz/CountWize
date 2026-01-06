# Phase 1B: Browser Evidence Capture Instructions

> **NEW**: For complete step-by-step instructions with troubleshooting, see
> **[PHASE_1B_OPERATOR_RUNBOOK.md](./PHASE_1B_OPERATOR_RUNBOOK.md)** (v1.1)

## Overview

Phase 1A (code analysis) is complete. Phase 1B requires **real browser testing** to capture:
- Screenshots at 4 viewports (desktop, tablet, mobile390, mobile360)
- Console logs for key pages
- Network HAR files
- axe accessibility reports
- Form submission evidence (success + failure)
- Domain redirect verification

## Quick Start

### Option 1: Run from this folder

```bash
# Navigate to baseline_phase_1
cd baseline_phase_1

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Run against live site
node baseline-capture.mjs --base https://countwize.com --out .

# Or run against local server
node baseline-capture.mjs --base http://localhost:8080 --out .
```

### Option 2: Run from a separate folder

```bash
# Create a new folder
mkdir cw-baseline-phase1b && cd cw-baseline-phase1b

# Initialize node project
npm init -y

# Install deps
npm i -D playwright @axe-core/playwright

# Install browsers
npx playwright install chromium

# Copy the script
cp ../baseline_phase_1/baseline-capture.mjs .

# Run against live site
node baseline-capture.mjs --base https://countwize.com --out baseline_phase_1

# Zip the output
zip -r baseline_phase_1.zip baseline_phase_1
```

## What the Script Produces

```
baseline_phase_1/
├── PHASE_1B_RUN_INFO.txt           # Run metadata
├── PHASE_1B_DONE.txt               # Completion marker
├── PHASE_1B_screenshots_log.txt    # Screenshot capture log
├── domain_redirects.txt            # www vs non-www verification
├── screenshots/
│   ├── home_desktop_abovefold.png
│   ├── home_tablet_abovefold.png
│   ├── home_mobile390_abovefold.png
│   ├── home_mobile390_footer.png
│   ├── home_mobile360_abovefold.png
│   ├── recovery_*.png
│   ├── contact-us_*.png
│   ├── questionnaire_*.png
│   └── news_*.png
├── console-logs/
│   ├── home_console.txt
│   ├── contact_us_console.txt
│   ├── questionnaire_console.txt
│   └── news_console.txt
├── network-logs/
│   ├── home_network.har
│   ├── contact_us_network.har
│   └── questionnaire_network.har
├── accessibility/
│   ├── axe_home.json
│   ├── axe_contact_us.json
│   └── axe_questionnaire.json
└── forms-evidence/
    ├── home_form_notes.txt
    ├── contact_form_notes.txt
    ├── questionnaire_notes.txt
    └── submission_success_screenshots/
        ├── home_form_success.png
        ├── home_form_invalid_phone_blocked.png
        ├── contact_form_success.png
        ├── contact_form_invalid_phone_blocked.png
        ├── questionnaire_step18.png
        ├── questionnaire_step19.png
        ├── questionnaire_submit_success.png
        └── questionnaire_invalid_phone_blocked.png
```

## Important Notes

### Form Testing Safety
The script **mocks the Telegram endpoint** so no real leads are created:
```javascript
if (url.includes("telegram-vercel-seven.vercel.app")) {
  return route.fulfill({ status: 200, body: JSON.stringify({ ok: true, mocked: true }) });
}
```

### What to Look For in Results

1. **Screenshots**: Visual baseline for regression detection
2. **Console logs**: Check for errors/warnings (baseline count)
3. **HAR files**: Verify all APIs respond correctly
4. **axe reports**: Baseline accessibility violation count
5. **Form notes**: Verify validation blocks invalid submissions

### After Running

1. Review the outputs for any critical failures
2. Update `PHASE_1_REPORT.md` with findings
3. Commit all artifacts to the branch
4. Phase 2 can begin when gates are measurable

## Troubleshooting

### "Cannot find module 'playwright'"
```bash
npm install playwright @axe-core/playwright
npx playwright install chromium
```

### Timeout errors
Increase timeout in script or check network connectivity:
```javascript
await page.goto(url, { timeout: 90000 });
```

### Forms not filling correctly
Form field IDs may have changed. Check browser DevTools and update selectors in script.

## Requirements

- Node.js 18+
- ~500MB disk space for Chromium
- Internet connection to live site (or local server)
