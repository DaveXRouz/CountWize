# Walkthrough Section - Quick Start Guide

## Problem
The walkthrough section (orange section with phone UI) appears blank because Rive animation files fail to load due to CORS errors.

## Solution
Two solutions have been implemented:

### Solution 1: Proxy Server (Recommended)
Use the Node.js proxy server which intercepts Rive file requests at the network level:

```bash
cd jeton-site
npm run server
# or
node proxy-server.js
```

Then visit: http://localhost:9000

### Solution 2: Python Server with Interceptor
The HTML includes a JavaScript interceptor that rewrites Rive URLs:

```bash
cd jeton-site
python3 -m http.server 9000
```

**Note**: This may still have CORS issues. The proxy server is more reliable.

## Testing

### Test Walkthrough Section
```bash
npm run test-walkthrough
```

### Run Visual Comparison
```bash
node visual-comparison.js
```

### Run Full Visual Audit
```bash
npm run visual-audit
```

## Files

- **Rive Files**: `rive/*.riv` (5 animation files)
- **Proxy Server**: `proxy-server.js`
- **Interceptor**: Added to `index.html` (runs before other scripts)
- **Test Scripts**: `test-walkthrough.js`, `visual-audit.js`, `visual-comparison.js`

## Verification

The walkthrough section should display:
- Phone UI with transaction details ("Your request has been received", "€600", etc.)
- "Simple" text on the left
- "fast & safe" text on the right
- Stepper navigation (01-05 buttons)
- "Restart" button

If still blank:
1. Check browser console for errors
2. Wait 5-10 seconds for Rive to initialize
3. Try using the proxy server instead of Python server
4. Run `node verify-rive-loading.js` to diagnose
