# Console Logs Directory
## Phase 1 Baseline - BROWSER TESTING REQUIRED

This folder should contain console output for key pages:
- home_console.txt
- contact_console.txt
- questionnaire_console.txt
- news_console.txt

## What to Capture

For each page, record:
1. All console.log/info/warn/error messages
2. Network errors (4xx/5xx)
3. CORS issues
4. Mixed content warnings
5. Uncaught exceptions

## How to Capture

### Using Chrome DevTools
1. Open DevTools > Console
2. Clear console (Ctrl+L)
3. Navigate to page
4. Wait for full load
5. Right-click > Save as...

### Using Playwright
```javascript
page.on('console', msg => console.log(msg.text()));
page.on('pageerror', err => console.log(err.message));
```

## Expected Issues to Look For
- [ ] ipapi.co rate limiting
- [ ] countwiseapi.space connectivity
- [ ] LiveChat initialization errors
- [ ] Font loading issues
- [ ] Image 404s

## Status
**PENDING** - Console logs not yet captured (CLI analysis only)
