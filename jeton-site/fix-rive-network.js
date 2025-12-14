/**
 * Fix Rive Network Requests
 * Uses Playwright to intercept network requests and serve local Rive files
 */

const { chromium } = require('playwright');
const fs = require('fs-extra');
const path = require('path');

const LOCAL_URL = 'http://localhost:9000';
const RIVE_DIR = path.join(__dirname, 'rive');

/**
 * Create a modified HTML with network-level interceptor
 */
async function createInterceptorHTML() {
  const htmlPath = path.join(__dirname, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Add service worker registration for network interception
  const serviceWorkerScript = `
<script>
// Service Worker for Rive file interception
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw-rive-interceptor.js').catch(() => {
    // Service worker registration failed, use fetch interceptor
    console.log('Service worker not available, using fetch interceptor');
  });
}
</script>
`;
  
  // Add before closing head
  if (html.includes('</head>')) {
    html = html.replace('</head>', `${serviceWorkerScript}\n</head>`);
  }
  
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('✓ Added service worker registration to HTML');
}

/**
 * Create service worker for network interception
 */
function createServiceWorker() {
  const swContent = `
// Service Worker - Rive File Interceptor
const RIVE_FILES = {
  '8d69d40e5b4bce75fcc798d223029db8a1ccdeab.riv': '/rive/8d69d40e5b4bce75fcc798d223029db8a1ccdeab.riv',
  '01ab41d2c3f10a4db55f02c855b37106ae2d2568.riv': '/rive/01ab41d2c3f10a4db55f02c855b37106ae2d2568.riv',
  '6442a9110636ba0da2e6c0c731d92457d7e928cc.riv': '/rive/6442a9110636ba0da2e6c0c731d92457d7e928cc.riv',
  '23a3c11ba226d4bb7e916918723d814288b77265.riv': '/rive/23a3c11ba226d4bb7e916918723d814288b77265.riv',
  '95cea0426464659130966516e85464603be1e091.riv': '/rive/95cea0426464659130966516e85464603be1e091.riv'
};

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  if (url.includes('cdn.sanity.io') && url.includes('.riv')) {
    const fileName = url.split('/').pop();
    if (RIVE_FILES[fileName]) {
      event.respondWith(
        fetch(RIVE_FILES[fileName]).catch(() => {
          // Fallback to original request if local file fails
          return fetch(event.request);
        })
      );
    }
  }
});
`;
  
  const swPath = path.join(__dirname, 'sw-rive-interceptor.js');
  fs.writeFileSync(swPath, swContent, 'utf8');
  console.log('✓ Created service worker');
}

/**
 * Test with Playwright route interception
 */
async function testWithRouteInterception() {
  console.log('Testing with Playwright route interception...\n');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  // Intercept network requests
  await context.route('**/*.riv', async (route) => {
    const url = route.request().url();
    
    if (url.includes('cdn.sanity.io')) {
      const fileName = url.split('/').pop();
      const localPath = path.join(RIVE_DIR, fileName);
      
      if (fs.existsSync(localPath)) {
        console.log(`Intercepting: ${fileName}`);
        const fileContent = fs.readFileSync(localPath);
        await route.fulfill({
          status: 200,
          contentType: 'application/octet-stream',
          body: fileContent
        });
        return;
      }
    }
    
    // Continue with original request
    await route.continue();
  });
  
  const page = await context.newPage();
  
  // Monitor console for Rive errors
  page.on('console', msg => {
    if (msg.text().includes('Rive') || msg.text().includes('.riv')) {
      console.log('Console:', msg.text());
    }
  });
  
  // Monitor failed requests
  page.on('requestfailed', request => {
    if (request.url().includes('.riv')) {
      console.log('Failed request:', request.url());
    }
  });
  
  await page.goto(LOCAL_URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(8000);
  
  // Scroll to walkthrough
  const walkthrough = await page.$('._jeton-walkthrough');
  if (walkthrough) {
    await walkthrough.scrollIntoViewIfNeeded();
    await page.waitForTimeout(3000);
    
    // Check if Rive loaded
    const riveStatus = await page.evaluate(() => {
      const canvases = document.querySelectorAll('._jeton-walkthrough ._rive-asset');
      return {
        canvasCount: canvases.length,
        canvases: Array.from(canvases).map(c => ({
          id: c.id,
          opacity: window.getComputedStyle(c).opacity,
          visible: c.offsetWidth > 0 && c.offsetHeight > 0
        }))
      };
    });
    
    console.log('\nRive Status:', JSON.stringify(riveStatus, null, 2));
    
    // Take screenshot
    const screenshotPath = path.join(__dirname, 'screenshots', 'walkthrough-with-interception.png');
    fs.ensureDirSync(path.dirname(screenshotPath));
    await walkthrough.screenshot({ path: screenshotPath });
    console.log(`\n✓ Screenshot saved: ${screenshotPath}`);
  }
  
  await page.close();
  await context.close();
  await browser.close();
}

/**
 * Main function
 */
async function main() {
  console.log('Setting up Rive network interception...\n');
  
  // Create service worker (optional, for browser-level interception)
  createServiceWorker();
  createInterceptorHTML();
  
  // Test with Playwright route interception (more reliable)
  await testWithRouteInterception();
  
  console.log('\n✓ Network interception setup complete');
  console.log('\nNote: For permanent fix, you may need to:');
  console.log('1. Use a proxy server to rewrite URLs');
  console.log('2. Or modify the JavaScript files directly if possible');
  console.log('3. Or use Playwright route interception in your test environment');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testWithRouteInterception, createServiceWorker };
