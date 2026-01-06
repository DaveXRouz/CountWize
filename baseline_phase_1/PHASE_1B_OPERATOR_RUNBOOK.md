# Phase 1B Operator Runbook v1.1
## CountWize Stability Baseline - Browser Evidence Capture

**Version**: 1.1
**Last Updated**: 2026-01-06
**Branch**: `claude/phase-1-stability-baseline-bi663`

---

## A) WHY PHASE 1B FAILED (1 PARAGRAPH)

Phase 1B execution failed because the automated environment (Claude Code runtime) operates behind a network firewall that blocks outbound HTTPS connections to external domains. Playwright encountered `net::ERR_TUNNEL_CONNECTION_FAILED` when attempting to connect to countwize.com, and Lighthouse encountered `CHROME_INTERSTITIAL_ERROR` which caused Chrome to redirect to `chrome-error://chromewebdata/` instead of loading the target pages. All generated artifacts contain error data rather than valid baseline measurements. The scripts themselves are functional—only network access is missing. Phase 1B must be re-executed on a machine with unrestricted internet access to countwize.com.

---

## B) FASTEST PATH TO COMPLETE PHASE 1B

### Approach 1 (RECOMMENDED): Run Against LIVE Site

**Best for**: Home network, mobile hotspot, VPS, any unrestricted connection.

| Step | Action |
|------|--------|
| 1 | Verify you can access https://countwize.com in browser |
| 2 | Run preflight check (see Section C) |
| 3 | Run `baseline-capture.mjs` against `https://countwize.com` |
| 4 | Run 6 Lighthouse reports |
| 5 | Validate artifacts (Section D) |
| 6 | Fill completion report (Section G) |
| 7 | Commit and push |

**Total time**: ~15-20 minutes

---

### Approach 2 (FALLBACK): Run Against LOCAL Netlify Dev Server

**Best for**: Corporate network that blocks countwize.com but allows npm/CDN.

| Step | Action |
|------|--------|
| 1 | Install Netlify CLI: `npm install -g netlify-cli` |
| 2 | Run `netlify dev` in repo root |
| 3 | Wait for local server at `http://localhost:8888` |
| 4 | Run capture script against `http://localhost:8888` |
| 5 | Run Lighthouse against localhost (limited value) |

**LIMITATIONS** (READ CAREFULLY):
- Third-party scripts (LiveChat, ipapi.co, intl-tel-input CDN) still require internet
- If ALL HTTPS is blocked, page render will be incomplete (missing external CSS/JS)
- Form submissions to Telegram endpoint will fail (expected)
- Lighthouse scores against localhost are NOT representative of production
- Use this ONLY if Approach 1 is impossible
- Document in completion report that local mode was used

---

## C) EXACT COMMANDS (COPY/PASTE)

### Prerequisites (All Platforms)
- Node.js 18.x or higher
- Git
- ~500MB disk space for Chromium
- Unrestricted internet access to https://countwize.com

---

### macOS / Linux (bash/zsh)

```bash
#!/bin/bash
# ============================================
# PHASE 1B: CountWize Browser Evidence Capture
# ============================================
set -e  # Exit on error

# 0. Prerequisites check
echo "=== PREREQUISITES CHECK ==="
node --version || { echo "ERROR: Node.js not installed"; exit 1; }
[[ $(node --version | cut -d. -f1 | tr -d 'v') -ge 18 ]] || { echo "ERROR: Node.js 18+ required"; exit 1; }

# 1. Navigate to repo (assumes already cloned)
cd /path/to/CountWize  # <-- CHANGE THIS to your repo path
git checkout claude/phase-1-stability-baseline-bi663
git pull origin claude/phase-1-stability-baseline-bi663

# 2. Navigate to baseline folder
cd baseline_phase_1

# 3. Install dependencies
echo "=== INSTALLING DEPENDENCIES ==="
npm install

# 4. Install Playwright browser
echo "=== INSTALLING PLAYWRIGHT CHROMIUM ==="
npx playwright install chromium

# 5. PREFLIGHT CHECK (CRITICAL - DO NOT SKIP)
echo "=== PREFLIGHT NETWORK CHECK ==="

# DNS check
if ! host countwize.com >/dev/null 2>&1; then
    echo "FAIL: DNS resolution failed for countwize.com"
    echo "Try: Use public DNS (8.8.8.8) or check network"
    exit 1
fi
echo "PASS: DNS resolves"

# HTTP check
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 https://countwize.com/)
if [[ "$HTTP_STATUS" != "200" && "$HTTP_STATUS" != "301" && "$HTTP_STATUS" != "302" ]]; then
    echo "FAIL: HTTP request returned $HTTP_STATUS (expected 200/301/302)"
    echo "Check if you're behind a proxy or captive portal"
    exit 1
fi
echo "PASS: HTTP returns $HTTP_STATUS"

# Check not redirected to error page
FINAL_URL=$(curl -s -o /dev/null -w "%{url_effective}" -L --max-time 10 https://countwize.com/)
if [[ "$FINAL_URL" == *"chrome-error"* || "$FINAL_URL" == *"captive"* ]]; then
    echo "FAIL: Redirected to error/captive page: $FINAL_URL"
    exit 1
fi
echo "PASS: Final URL is $FINAL_URL"
echo "=== PREFLIGHT PASSED ==="

# 6. Run Playwright capture script
echo "=== RUNNING PLAYWRIGHT CAPTURE ==="
node baseline-capture.mjs --base https://countwize.com --out .

# 7. Find Chrome path for Lighthouse (platform-specific)
echo "=== DETECTING CHROME PATH ==="
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    CHROME_PATH=$(find ~/Library/Caches/ms-playwright -name "Chromium" -type f 2>/dev/null | grep "MacOS/Chromium" | head -1)
    if [[ -z "$CHROME_PATH" ]]; then
        CHROME_PATH=$(find ~/.cache/ms-playwright -name "Chromium" -type f 2>/dev/null | grep "MacOS/Chromium" | head -1)
    fi
else
    # Linux
    CHROME_PATH=$(find ~/.cache/ms-playwright -name "chrome" -type f 2>/dev/null | grep "chrome-linux" | head -1)
fi

if [[ -z "$CHROME_PATH" ]]; then
    echo "ERROR: Could not find Playwright Chromium"
    echo "Try running: npx playwright install chromium"
    exit 1
fi
echo "Chrome path: $CHROME_PATH"

# 8. Run Lighthouse (6 reports)
echo "=== RUNNING LIGHTHOUSE (6 reports) ==="

# Home Mobile
echo "  -> home_mobile.html"
npx lighthouse https://countwize.com/ \
  --output html --output-path ./lighthouse/home_mobile.html \
  --form-factor mobile \
  --chrome-path="$CHROME_PATH" \
  --chrome-flags="--headless --no-sandbox --disable-gpu" \
  --only-categories=performance,accessibility,best-practices,seo \
  --quiet

# Home Desktop
echo "  -> home_desktop.html"
npx lighthouse https://countwize.com/ \
  --output html --output-path ./lighthouse/home_desktop.html \
  --form-factor desktop --screenEmulation.disabled \
  --chrome-path="$CHROME_PATH" \
  --chrome-flags="--headless --no-sandbox --disable-gpu" \
  --only-categories=performance,accessibility,best-practices,seo \
  --quiet

# Contact Mobile
echo "  -> contact_mobile.html"
npx lighthouse https://countwize.com/contact-us \
  --output html --output-path ./lighthouse/contact_mobile.html \
  --form-factor mobile \
  --chrome-path="$CHROME_PATH" \
  --chrome-flags="--headless --no-sandbox --disable-gpu" \
  --only-categories=performance,accessibility,best-practices,seo \
  --quiet

# Contact Desktop
echo "  -> contact_desktop.html"
npx lighthouse https://countwize.com/contact-us \
  --output html --output-path ./lighthouse/contact_desktop.html \
  --form-factor desktop --screenEmulation.disabled \
  --chrome-path="$CHROME_PATH" \
  --chrome-flags="--headless --no-sandbox --disable-gpu" \
  --only-categories=performance,accessibility,best-practices,seo \
  --quiet

# Questionnaire Mobile
echo "  -> questionnaire_mobile.html"
npx lighthouse https://countwize.com/recovery-questionnaire \
  --output html --output-path ./lighthouse/questionnaire_mobile.html \
  --form-factor mobile \
  --chrome-path="$CHROME_PATH" \
  --chrome-flags="--headless --no-sandbox --disable-gpu" \
  --only-categories=performance,accessibility,best-practices,seo \
  --quiet

# Questionnaire Desktop
echo "  -> questionnaire_desktop.html"
npx lighthouse https://countwize.com/recovery-questionnaire \
  --output html --output-path ./lighthouse/questionnaire_desktop.html \
  --form-factor desktop --screenEmulation.disabled \
  --chrome-path="$CHROME_PATH" \
  --chrome-flags="--headless --no-sandbox --disable-gpu" \
  --only-categories=performance,accessibility,best-practices,seo \
  --quiet

# 9. Validate artifacts
echo "=== ARTIFACT VALIDATION ==="
echo "Screenshots (viewport): $(find ./screenshots -name '*.png' 2>/dev/null | wc -l | tr -d ' ') (expect ≥25)"
echo "Screenshots (forms): $(find ./forms-evidence -name '*.png' 2>/dev/null | wc -l | tr -d ' ') (expect ≥6)"
echo "Console logs: $(find ./console-logs -name '*.txt' 2>/dev/null | wc -l | tr -d ' ') (expect 4)"
echo "Network HAR: $(find ./network-logs -name '*.har' 2>/dev/null | wc -l | tr -d ' ') (expect 3)"
echo "Axe JSON: $(find ./accessibility -name '*.json' 2>/dev/null | wc -l | tr -d ' ') (expect 3)"
echo "Lighthouse HTML: $(find ./lighthouse -name '*.html' 2>/dev/null | wc -l | tr -d ' ') (expect 6)"

# 10. Check for blank screenshots (should be >50KB)
echo ""
echo "=== SCREENSHOT SIZE CHECK ==="
SMALL_FILES=$(find ./screenshots -name '*.png' -size -50k 2>/dev/null | wc -l | tr -d ' ')
if [[ "$SMALL_FILES" -gt 0 ]]; then
    echo "WARNING: $SMALL_FILES screenshots are <50KB (possibly blank)"
    find ./screenshots -name '*.png' -size -50k
else
    echo "PASS: All screenshots are ≥50KB"
fi

# 11. Check Lighthouse for errors
echo ""
echo "=== LIGHTHOUSE ERROR CHECK ==="
for f in ./lighthouse/*.html; do
    if grep -q "CHROME_INTERSTITIAL_ERROR" "$f" 2>/dev/null; then
        echo "FAIL: $f contains interstitial error"
    else
        echo "PASS: $f"
    fi
done

echo ""
echo "=== PHASE 1B CAPTURE COMPLETE ==="
echo "Next: Fill out PHASE_1B_COMPLETION_REPORT.md"
```

---

### Windows PowerShell

```powershell
# ============================================
# PHASE 1B: CountWize Browser Evidence Capture
# ============================================
$ErrorActionPreference = "Stop"

# 0. Prerequisites check
Write-Host "=== PREREQUISITES CHECK ===" -ForegroundColor Cyan
$nodeVersion = node --version
Write-Host "Node.js: $nodeVersion"
if (-not ($nodeVersion -match "^v(\d+)") -or [int]$Matches[1] -lt 18) {
    Write-Host "ERROR: Node.js 18+ required" -ForegroundColor Red
    exit 1
}

# 1. Navigate to repo (assumes already cloned)
Set-Location "C:\path\to\CountWize"  # <-- CHANGE THIS
git checkout claude/phase-1-stability-baseline-bi663
git pull origin claude/phase-1-stability-baseline-bi663

# 2. Navigate to baseline folder
Set-Location baseline_phase_1

# 3. Install dependencies
Write-Host "=== INSTALLING DEPENDENCIES ===" -ForegroundColor Cyan
npm install

# 4. Install Playwright browser
Write-Host "=== INSTALLING PLAYWRIGHT CHROMIUM ===" -ForegroundColor Cyan
npx playwright install chromium

# 5. PREFLIGHT CHECK
Write-Host "=== PREFLIGHT NETWORK CHECK ===" -ForegroundColor Cyan

# DNS check
try {
    $dns = Resolve-DnsName countwize.com -ErrorAction Stop
    Write-Host "PASS: DNS resolves" -ForegroundColor Green
} catch {
    Write-Host "FAIL: DNS resolution failed" -ForegroundColor Red
    exit 1
}

# HTTP check
try {
    $response = Invoke-WebRequest -Uri "https://countwize.com/" -Method Head -UseBasicParsing -TimeoutSec 10
    Write-Host "PASS: HTTP returns $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "FAIL: HTTP request failed - $_" -ForegroundColor Red
    exit 1
}

Write-Host "=== PREFLIGHT PASSED ===" -ForegroundColor Green

# 6. Run Playwright capture script
Write-Host "=== RUNNING PLAYWRIGHT CAPTURE ===" -ForegroundColor Cyan
node baseline-capture.mjs --base https://countwize.com --out .

# 7. Find Chrome path for Lighthouse
Write-Host "=== DETECTING CHROME PATH ===" -ForegroundColor Cyan
$chromePath = Get-ChildItem -Path "$env:USERPROFILE\.cache\ms-playwright" -Recurse -Filter "chrome.exe" -ErrorAction SilentlyContinue |
    Where-Object { $_.FullName -match "chromium" } |
    Select-Object -First 1 -ExpandProperty FullName

if (-not $chromePath) {
    # Fallback to LOCALAPPDATA
    $chromePath = Get-ChildItem -Path "$env:LOCALAPPDATA\ms-playwright" -Recurse -Filter "chrome.exe" -ErrorAction SilentlyContinue |
        Where-Object { $_.FullName -match "chromium" } |
        Select-Object -First 1 -ExpandProperty FullName
}

if (-not $chromePath) {
    Write-Host "ERROR: Could not find Playwright Chromium" -ForegroundColor Red
    Write-Host "Try: npx playwright install chromium"
    exit 1
}
Write-Host "Chrome path: $chromePath"

# 8. Run Lighthouse (6 reports)
Write-Host "=== RUNNING LIGHTHOUSE (6 reports) ===" -ForegroundColor Cyan

$pages = @(
    @{url="https://countwize.com/"; name="home"},
    @{url="https://countwize.com/contact-us"; name="contact"},
    @{url="https://countwize.com/recovery-questionnaire"; name="questionnaire"}
)

foreach ($page in $pages) {
    # Mobile
    Write-Host "  -> $($page.name)_mobile.html"
    npx lighthouse $page.url `
        --output html --output-path "./lighthouse/$($page.name)_mobile.html" `
        --form-factor mobile `
        --chrome-path="$chromePath" `
        --chrome-flags="--headless" `
        --only-categories=performance,accessibility,best-practices,seo `
        --quiet

    # Desktop
    Write-Host "  -> $($page.name)_desktop.html"
    npx lighthouse $page.url `
        --output html --output-path "./lighthouse/$($page.name)_desktop.html" `
        --form-factor desktop --screenEmulation.disabled `
        --chrome-path="$chromePath" `
        --chrome-flags="--headless" `
        --only-categories=performance,accessibility,best-practices,seo `
        --quiet
}

# 9. Validate artifacts
Write-Host "=== ARTIFACT VALIDATION ===" -ForegroundColor Cyan
$screenshots = (Get-ChildItem ./screenshots -Filter *.png -ErrorAction SilentlyContinue | Measure-Object).Count
$formShots = (Get-ChildItem ./forms-evidence -Filter *.png -Recurse -ErrorAction SilentlyContinue | Measure-Object).Count
$consoleLogs = (Get-ChildItem ./console-logs -Filter *.txt -ErrorAction SilentlyContinue | Measure-Object).Count
$harFiles = (Get-ChildItem ./network-logs -Filter *.har -ErrorAction SilentlyContinue | Measure-Object).Count
$axeFiles = (Get-ChildItem ./accessibility -Filter *.json -ErrorAction SilentlyContinue | Measure-Object).Count
$lhFiles = (Get-ChildItem ./lighthouse -Filter *.html -ErrorAction SilentlyContinue | Measure-Object).Count

Write-Host "Screenshots (viewport): $screenshots (expect >=25)"
Write-Host "Screenshots (forms): $formShots (expect >=6)"
Write-Host "Console logs: $consoleLogs (expect 4)"
Write-Host "Network HAR: $harFiles (expect 3)"
Write-Host "Axe JSON: $axeFiles (expect 3)"
Write-Host "Lighthouse HTML: $lhFiles (expect 6)"

# 10. Check for blank screenshots
Write-Host ""
Write-Host "=== SCREENSHOT SIZE CHECK ===" -ForegroundColor Cyan
$smallFiles = Get-ChildItem ./screenshots -Filter *.png -ErrorAction SilentlyContinue | Where-Object { $_.Length -lt 51200 }
if ($smallFiles) {
    Write-Host "WARNING: $($smallFiles.Count) screenshots are <50KB" -ForegroundColor Yellow
    $smallFiles | ForEach-Object { Write-Host "  $($_.Name)" }
} else {
    Write-Host "PASS: All screenshots are >=50KB" -ForegroundColor Green
}

# 11. Check Lighthouse for errors
Write-Host ""
Write-Host "=== LIGHTHOUSE ERROR CHECK ===" -ForegroundColor Cyan
Get-ChildItem ./lighthouse -Filter *.html | ForEach-Object {
    if (Select-String -Path $_.FullName -Pattern "CHROME_INTERSTITIAL_ERROR" -Quiet) {
        Write-Host "FAIL: $($_.Name) contains interstitial error" -ForegroundColor Red
    } else {
        Write-Host "PASS: $($_.Name)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "=== PHASE 1B CAPTURE COMPLETE ===" -ForegroundColor Green
Write-Host "Next: Fill out PHASE_1B_COMPLETION_REPORT.md"
```

---

## D) ARTIFACT VALIDATION CHECKLIST

After running, verify EACH item. **ALL must PASS for Phase 1B to be complete.**

| # | Artifact | Path Pattern | Expected Count | Validation Method | Result |
|---|----------|--------------|----------------|-------------------|--------|
| 1 | Viewport Screenshots | `screenshots/*.png` | ≥25 | Each file >50KB; open 5 random PNGs, must show page content | ☐ PASS / ☐ FAIL |
| 2 | Form Screenshots | `forms-evidence/**/*.png` | ≥6 | Must show form fields or validation errors | ☐ PASS / ☐ FAIL |
| 3 | Console Logs | `console-logs/*.txt` | =4 | Contains `NAVIGATED:` with real URL, NOT `about:blank` | ☐ PASS / ☐ FAIL |
| 4 | Network HAR | `network-logs/*.har` | =3 | File size >10KB; contains `"entries"` array with requests | ☐ PASS / ☐ FAIL |
| 5 | Axe Reports | `accessibility/*.json` | =3 | Contains `"violations"` key; NOT `{"error":...}` | ☐ PASS / ☐ FAIL |
| 6 | Lighthouse Reports | `lighthouse/*.html` | =6 | Open in browser; shows scores 0-100; no "CHROME_INTERSTITIAL_ERROR" | ☐ PASS / ☐ FAIL |
| 7 | Form Notes | `forms-evidence/*_notes.txt` | ≥3 | Contains test timestamps, NOT only error messages | ☐ PASS / ☐ FAIL |

### Validation Commands

**macOS/Linux:**
```bash
# 1. Check screenshot sizes
find ./screenshots -name '*.png' -size -50k -exec echo "SMALL: {}" \;

# 2. Check console logs have real navigation
grep -l "NAVIGATED.*countwize" ./console-logs/*.txt | wc -l  # Should be 4

# 3. Check HAR has entries
for f in ./network-logs/*.har; do
  entries=$(grep -c '"request"' "$f" 2>/dev/null || echo 0)
  echo "$f: $entries requests"
done

# 4. Check axe has violations key (not error)
for f in ./accessibility/*.json; do
  if grep -q '"violations"' "$f"; then
    echo "PASS: $f"
  else
    echo "FAIL: $f (missing violations key)"
  fi
done

# 5. Check Lighthouse isn't error report
for f in ./lighthouse/*.html; do
  if grep -q "CHROME_INTERSTITIAL_ERROR" "$f"; then
    echo "FAIL: $f"
  else
    echo "PASS: $f"
  fi
done
```

**Windows PowerShell:**
```powershell
# 1. Check screenshot sizes
Get-ChildItem ./screenshots -Filter *.png | Where-Object { $_.Length -lt 51200 } | ForEach-Object { "SMALL: $($_.Name)" }

# 2. Check console logs
(Get-ChildItem ./console-logs -Filter *.txt | Where-Object { (Get-Content $_) -match "NAVIGATED.*countwize" }).Count  # Should be 4

# 3. Check HAR has entries
Get-ChildItem ./network-logs -Filter *.har | ForEach-Object {
    $entries = (Select-String -Path $_.FullName -Pattern '"request"' | Measure-Object).Count
    "$($_.Name): $entries requests"
}

# 4. Check axe has violations
Get-ChildItem ./accessibility -Filter *.json | ForEach-Object {
    if (Select-String -Path $_.FullName -Pattern '"violations"' -Quiet) { "PASS: $($_.Name)" }
    else { "FAIL: $($_.Name)" }
}

# 5. Check Lighthouse
Get-ChildItem ./lighthouse -Filter *.html | ForEach-Object {
    if (Select-String -Path $_.FullName -Pattern "CHROME_INTERSTITIAL_ERROR" -Quiet) { "FAIL: $($_.Name)" }
    else { "PASS: $($_.Name)" }
}
```

---

## E) TROUBLESHOOTING DECISION TREE

### Issue 1: Preflight Fails - DNS Resolution

```
Symptom: "FAIL: DNS resolution failed"
    │
    ├─► Check 1: Are you on corporate network with DNS filtering?
    │       │
    │       └─► Fix: Use public DNS
    │           macOS: networksetup -setdnsservers Wi-Fi 8.8.8.8 1.1.1.1
    │           Linux: echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
    │           Windows: Set-DnsClientServerAddress -InterfaceAlias "Wi-Fi" -ServerAddresses 8.8.8.8,1.1.1.1
    │
    └─► Check 2: Is countwize.com actually down?
            │
            └─► Verify: https://downforeveryoneorjustme.com/countwize.com
                If down: Wait and retry later
```

### Issue 2: Preflight Fails - HTTP Request

```
Symptom: "FAIL: HTTP request returned 000/403/503"
    │
    ├─► 000 (No response)
    │       │
    │       └─► Cause: Network blocks HTTPS entirely
    │           Fix: Use different network (mobile hotspot, VPN, VPS)
    │
    ├─► 403 (Forbidden)
    │       │
    │       └─► Cause: Cloudflare blocking automated requests
    │           Fix: Try from different IP; use headed mode (see Issue 5)
    │
    └─► 503 (Service Unavailable)
            │
            └─► Cause: Site temporarily down
                Fix: Wait 5-10 minutes, retry
```

### Issue 3: `net::ERR_TUNNEL_CONNECTION_FAILED`

```
Symptom: Playwright script fails with tunnel error
    │
    ├─► Cause: Corporate proxy blocking HTTPS
    │       │
    │       └─► Fix Option A: Use different network
    │           Fix Option B: Configure proxy (if allowed):
    │               export HTTPS_PROXY=http://proxy.company.com:8080
    │               export HTTP_PROXY=http://proxy.company.com:8080
    │
    └─► Cause: VPN interfering
            │
            └─► Fix: Disconnect VPN, retry
```

### Issue 4: Lighthouse `CHROME_INTERSTITIAL_ERROR`

```
Symptom: Lighthouse HTML shows "Chrome prevented page load"
    │
    ├─► Cause: Same network issue as Playwright
    │       │
    │       └─► Fix: Resolve network issue first (see Issue 2/3)
    │
    └─► Cause: Chrome sandbox issue on Linux
            │
            └─► Fix: Ensure --no-sandbox flag is included (already in commands)
```

### Issue 5: Cloudflare Challenge / Bot Detection

```
Symptom: Pages load but show "Checking your browser" or CAPTCHA
    │
    └─► Fix: Run in HEADED mode (browser visible)

        Step 1: Modify baseline-capture.mjs line 596:
                Change: chromium.launch({ headless: true })
                To:     chromium.launch({ headless: false })

        Step 2: Run script and manually solve CAPTCHA when prompted

        Step 3: Revert change after capture completes

        NOTE: This is a manual workaround. Document in completion report.
```

### Issue 6: Missing Routes (404 on /recovery)

```
Symptom: /recovery returns 404 but /recovery.html works
    │
    ├─► Cause: Running against static files without redirect rules
    │       │
    │       └─► Fix: Use `netlify dev` instead of `python -m http.server`
    │           cd /path/to/CountWize
    │           netlify dev
    │           # Then run script against http://localhost:8888
    │
    └─► Cause: Netlify redirect rules not applied
            │
            └─► Fix: Check netlify.toml exists and has correct redirects
```

### Issue 7: Playwright Selector Timeout

```
Symptom: "waiting for locator('form#email-form')" timeout
    │
    ├─► Cause: Page didn't fully load
    │       │
    │       └─► Fix: Check network; ensure page is accessible
    │
    ├─► Cause: Form structure changed
    │       │
    │       └─► Fix: Inspect live page; the script has fallback selectors
    │           If still fails: Document as known issue
    │
    └─► Cause: JavaScript error on page
            │
            └─► Fix: Check console-logs/*.txt for errors; report if blocking
```

### Issue 8: Screenshots are Blank (<50KB)

```
Symptom: PNG files exist but are mostly white/blank
    │
    ├─► Cause: Page didn't render (CSS not loaded)
    │       │
    │       └─► Fix: Check network; CDN access required
    │
    └─► Cause: Screenshot taken before render complete
            │
            └─► Fix: Increase wait time in script (line 78: 1500 -> 3000)
                await page.waitForTimeout(3000);
```

---

## F) SCRIPT HARDENING (APPLIED CHANGES)

The following change is RECOMMENDED to add preflight check:

### Change PH1B-TOOL-001: Add Preflight Network Check

| Aspect | Detail |
|--------|--------|
| **Change ID** | PH1B-TOOL-001 |
| **Risk** | Low |
| **What** | Add HTTP preflight check before launching browser |
| **Why** | Fail fast with clear error instead of waiting for timeout |
| **Verify** | Disconnect network, run script; should error within 5 seconds |

**Code to add at line 581 (beginning of `main()`):**

```javascript
async function main() {
  // PREFLIGHT CHECK
  console.log("Preflight: checking connectivity to", BASE);
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const resp = await fetch(BASE, { method: "HEAD", signal: controller.signal });
    clearTimeout(timeout);
    if (!resp.ok && resp.status !== 301 && resp.status !== 302) {
      throw new Error(`HTTP ${resp.status}`);
    }
    console.log("Preflight: OK (status", resp.status + ")");
  } catch (err) {
    console.error("❌ PREFLIGHT FAILED: Cannot reach", BASE);
    console.error("   Error:", err.message);
    console.error("   Check your network connection and try again.");
    process.exit(1);
  }

  // ... rest of main()
```

---

## G) PHASE 1B COMPLETION REPORT TEMPLATE

Save this as `PHASE_1B_COMPLETION_REPORT.md` after successful run:

```markdown
# Phase 1B Completion Report

## Execution Details

| Field | Value |
|-------|-------|
| Date | YYYY-MM-DD HH:MM (timezone) |
| Operator | [Your name] |
| Machine | [e.g., MacBook Pro M2 / Windows 11 Desktop] |
| OS Version | [e.g., macOS 14.2 / Windows 11 23H2 / Ubuntu 22.04] |
| Node Version | [output of `node --version`] |
| npm Version | [output of `npm --version`] |
| Network Type | [Home WiFi / Mobile Hotspot / VPS / Corporate] |
| Base URL | https://countwize.com/ |
| Approach Used | [1: Live Site / 2: Local Netlify Dev] |

## Artifact Counts

| Artifact | Expected | Actual | Status |
|----------|----------|--------|--------|
| Viewport Screenshots | ≥25 | ___ | ☐ PASS / ☐ FAIL |
| Form Screenshots | ≥6 | ___ | ☐ PASS / ☐ FAIL |
| Console Logs | 4 | ___ | ☐ PASS / ☐ FAIL |
| Network HAR | 3 | ___ | ☐ PASS / ☐ FAIL |
| Axe JSON | 3 | ___ | ☐ PASS / ☐ FAIL |
| Lighthouse HTML | 6 | ___ | ☐ PASS / ☐ FAIL |
| Form Notes | ≥3 | ___ | ☐ PASS / ☐ FAIL |

## QA Gate Results

| Gate | Metric | Target | Actual | Status |
|------|--------|--------|--------|--------|
| G1 | Lighthouse Perf (Home Mobile) | >50 | ___ | ☐ PASS / ☐ FAIL |
| G2 | Lighthouse Perf (Home Desktop) | >70 | ___ | ☐ PASS / ☐ FAIL |
| G3 | Lighthouse Accessibility (avg) | >80 | ___ | ☐ PASS / ☐ FAIL |
| G4 | Lighthouse Best Practices (avg) | >80 | ___ | ☐ PASS / ☐ FAIL |
| G5 | Lighthouse SEO (avg) | >80 | ___ | ☐ PASS / ☐ FAIL |
| G6 | Axe Critical Violations | 0 | ___ | ☐ PASS / ☐ FAIL |
| G7 | Console Blocking Errors | 0 | ___ | ☐ PASS / ☐ FAIL |

## Lighthouse Scores (Record All)

| Page | Device | Perf | A11y | BP | SEO |
|------|--------|------|------|-----|-----|
| Home | Mobile | ___ | ___ | ___ | ___ |
| Home | Desktop | ___ | ___ | ___ | ___ |
| Contact | Mobile | ___ | ___ | ___ | ___ |
| Contact | Desktop | ___ | ___ | ___ | ___ |
| Questionnaire | Mobile | ___ | ___ | ___ | ___ |
| Questionnaire | Desktop | ___ | ___ | ___ | ___ |

## Axe Accessibility Summary

| Page | Total Violations | Critical | Serious | Moderate | Minor |
|------|------------------|----------|---------|----------|-------|
| Home | ___ | ___ | ___ | ___ | ___ |
| Contact | ___ | ___ | ___ | ___ | ___ |
| Questionnaire | ___ | ___ | ___ | ___ | ___ |

## Form Test Results

| Form | Invalid Phone Blocked? | Valid Phone Submitted? | Notes |
|------|------------------------|------------------------|-------|
| Home Hero | ☐ Yes / ☐ No | ☐ Yes / ☐ No | |
| Contact Page | ☐ Yes / ☐ No | ☐ Yes / ☐ No | |
| Questionnaire | ☐ Yes / ☐ No | ☐ Yes / ☐ No | |
| Detail Service | ☐ Yes / ☐ No / ☐ Skipped (404) | ☐ Yes / ☐ No | |

## Visual Spot Check (Open and Verify)

- [ ] `screenshots/home_desktop_abovefold.png` - Shows homepage hero
- [ ] `screenshots/questionnaire_mobile390_abovefold.png` - Shows questionnaire
- [ ] `screenshots/contact-us_tablet_abovefold.png` - Shows contact form
- [ ] `forms-evidence/submission_success_screenshots/home_form_success.png` - Shows form state
- [ ] `forms-evidence/submission_success_screenshots/questionnaire_step18.png` - Shows step 18

## Critical Findings

List any issues discovered during capture:

1. [ ] ___
2. [ ] ___
3. [ ] ___

## Known Limitations (If Any)

- [ ] Used headed mode for Cloudflare challenge
- [ ] Used local Netlify dev (scores not representative)
- [ ] Some form tests skipped due to selector issues
- [ ] Other: ___

## Phase 1B Final Verdict

☐ **COMPLETE** - All artifacts valid, all gates measured
☐ **INCOMPLETE** - Missing: ___

## Signature

| Role | Name | Date |
|------|------|------|
| Operator | _______________ | _______________ |
```

---

## H) FINAL VERDICT RULE

### Phase 1B is **COMPLETE (READY FOR PHASE 2)** when ALL conditions are met:

1. ✅ Viewport screenshots: ≥25 files, each >50KB, showing real page content
2. ✅ Form screenshots: ≥6 files showing form states
3. ✅ Console logs: 4 files with `NAVIGATED:` containing real URLs
4. ✅ Network HAR: 3 files, each >10KB with request entries
5. ✅ Axe JSON: 3 files containing `"violations"` array (even if empty)
6. ✅ Lighthouse HTML: 6 files showing real scores (no CHROME_INTERSTITIAL_ERROR)
7. ✅ Form notes: ≥3 files with test results
8. ✅ Completion report: All fields populated with real values
9. ✅ All artifacts committed to branch `claude/phase-1-stability-baseline-bi663`

### Phase 1B is **INCOMPLETE** if ANY condition fails:

| Failure | Symptom | Required Action |
|---------|---------|-----------------|
| Network blocked | Screenshots blank, HAR empty | Change network, re-run |
| Lighthouse failed | HTML shows error page | Fix network, re-run Lighthouse only |
| Axe failed | JSON shows `{"error":...}` | Fix network, re-run script |
| Forms failed | Notes show only timeouts | May be selector issue; document and proceed if other evidence valid |
| Partial artifacts | Some counts below threshold | Re-run failed components only |

### Minimum Viable Completion

If forms cannot be tested due to selector changes but ALL other evidence is valid:
- Document form test failures in completion report
- Phase 1B can be marked COMPLETE with caveat
- Form testing becomes Phase 2 priority

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1B QUICK COMMANDS (macOS/Linux)                          │
├─────────────────────────────────────────────────────────────────┤
│ cd /path/to/CountWize/baseline_phase_1                         │
│ npm install && npx playwright install chromium                  │
│ node baseline-capture.mjs --base https://countwize.com --out . │
│ CHROME=$(find ~/.cache/ms-playwright -name chrome -type f | head -1)│
│ npx lighthouse URL --chrome-path="$CHROME" --output html ...   │
├─────────────────────────────────────────────────────────────────┤
│ VALIDATION QUICK CHECK                                          │
│ Screenshots >50KB: find ./screenshots -name '*.png' -size -50k │
│ Lighthouse OK: grep -L INTERSTITIAL ./lighthouse/*.html        │
│ Axe OK: grep -l '"violations"' ./accessibility/*.json          │
└─────────────────────────────────────────────────────────────────┘
```

---

**Runbook Version**: 1.1
**Author**: CW-ALPHA
**Date**: 2026-01-06
