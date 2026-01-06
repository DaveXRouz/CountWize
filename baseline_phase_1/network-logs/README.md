# Network Logs Directory
## Phase 1 Baseline - BROWSER TESTING REQUIRED

This folder should contain HAR (HTTP Archive) files:
- home_network.har
- contact_network.har
- questionnaire_network.har

## What to Capture

For each page, record:
1. All HTTP requests/responses
2. Request timing
3. Response sizes
4. API calls to:
   - ipapi.co
   - countwiseapi.space
   - restcountries.com
   - telegram-vercel-seven.vercel.app

## How to Capture

### Using Chrome DevTools
1. Open DevTools > Network
2. Check "Preserve log"
3. Navigate to page
4. Wait for full load + interact with forms
5. Right-click > Save all as HAR

### Using Playwright
```javascript
const har = await page.context().harFiles();
```

## Key Endpoints to Verify
| Endpoint | Expected Status |
|----------|-----------------|
| https://ipapi.co/json/ | 200 |
| https://countwiseapi.space/api/countries/ | 200 |
| https://countwiseapi.space/api/news/ | 200 |
| Google Analytics | 200/204 |
| Google Ads | 200/204 |
| LiveChat | 200 |

## Status
**PENDING** - HAR files not yet captured (CLI analysis only)
