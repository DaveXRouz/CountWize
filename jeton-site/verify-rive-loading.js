/**
 * Verify Rive Animation Loading
 * Checks if Rive files are actually loading and rendering
 */

const { chromium } = require('playwright');
const fs = require('fs-extra');
const path = require('path');

const LOCAL_URL = 'http://localhost:9000';

/**
 * Check Rive file loading with network interception
 */
async function verifyRiveLoading() {
  console.log('Verifying Rive animation loading...\n');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const riveRequests = [];
  const riveResponses = [];
  
  // Monitor network requests
  context.on('request', request => {
    const url = request.url();
    if (url.includes('.riv')) {
      riveRequests.push({
        url,
        method: request.method(),
        timestamp: Date.now()
      });
      console.log(`[REQUEST] ${url}`);
    }
  });
  
  context.on('response', response => {
    const url = response.url();
    if (url.includes('.riv')) {
      riveResponses.push({
        url,
        status: response.status(),
        headers: response.headers(),
        timestamp: Date.now()
      });
      console.log(`[RESPONSE] ${url} - Status: ${response.status()}`);
    }
  });
  
  // Intercept and serve local Rive files
  await context.route('**/*.riv', async (route) => {
    const url = route.request().url();
    console.log(`[INTERCEPT] ${url}`);
    
    if (url.includes('cdn.sanity.io')) {
      const fileName = url.split('/').pop();
      const localPath = path.join(__dirname, 'rive', fileName);
      
      if (fs.existsSync(localPath)) {
        console.log(`[SERVING LOCAL] ${fileName}`);
        const fileContent = fs.readFileSync(localPath);
        await route.fulfill({
          status: 200,
          contentType: 'application/octet-stream',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          },
          body: fileContent
        });
        return;
      }
    }
    
    // Continue with original request
    await route.continue();
  });
  
  const page = await context.newPage();
  
  // Monitor console
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('Rive') || text.includes('.riv') || text.includes('INTERCEPT')) {
      console.log(`[CONSOLE ${msg.type()}] ${text}`);
    }
  });
  
  // Monitor errors
  page.on('pageerror', error => {
    if (error.message.includes('Rive') || error.message.includes('.riv')) {
      console.log(`[ERROR] ${error.message}`);
    }
  });
  
  await page.goto(LOCAL_URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(10000); // Wait for all scripts to load
  
  // Scroll to walkthrough
  const walkthrough = await page.$('._jeton-walkthrough');
  if (walkthrough) {
    await walkthrough.scrollIntoViewIfNeeded();
    await page.waitForTimeout(5000); // Wait for Rive to load
    
    // Check Rive loading status
    const riveStatus = await page.evaluate(() => {
      const canvases = Array.from(document.querySelectorAll('._jeton-walkthrough ._rive-asset'));
      
      return {
        canvasCount: canvases.length,
        canvases: canvases.map((canvas, i) => {
          const ctx = canvas.getContext('2d');
          let hasContent = false;
          let pixelData = null;
          
          try {
            // Check if canvas has been drawn to
            const imageData = ctx.getImageData(0, 0, Math.min(100, canvas.width), Math.min(100, canvas.height));
            const data = imageData.data;
            
            // Check for non-transparent pixels
            for (let i = 3; i < Math.min(data.length, 400); i += 4) {
              if (data[i] > 0) {
                hasContent = true;
                break;
              }
            }
            
            pixelData = {
              sampleSize: imageData.width * imageData.height,
              nonTransparentPixels: 0
            };
            
            for (let i = 3; i < data.length; i += 4) {
              if (data[i] > 0) pixelData.nonTransparentPixels++;
            }
          } catch (e) {
            // Canvas might not be ready
          }
          
          return {
            index: i,
            id: canvas.id,
            width: canvas.width,
            height: canvas.height,
            style: {
              opacity: window.getComputedStyle(canvas).opacity,
              display: window.getComputedStyle(canvas).display,
              visibility: window.getComputedStyle(canvas).visibility
            },
            hasContent,
            pixelData
          };
        }),
        // Check for Rive library
        hasRiveLibrary: typeof window.rive !== 'undefined' || 
                       typeof window.Rive !== 'undefined' ||
                       document.querySelector('script[src*="rive"]') !== null
      };
    });
    
    console.log('\n=== Rive Loading Status ===');
    console.log(JSON.stringify(riveStatus, null, 2));
    
    console.log('\n=== Network Requests ===');
    console.log(`Total Rive requests: ${riveRequests.length}`);
    riveRequests.forEach(req => console.log(`  ${req.url}`));
    
    console.log('\n=== Network Responses ===');
    console.log(`Total Rive responses: ${riveResponses.length}`);
    riveResponses.forEach(res => {
      console.log(`  ${res.url} - ${res.status}`);
    });
    
    // Take screenshot
    const screenshotPath = path.join(__dirname, 'screenshots', 'rive-verification.png');
    fs.ensureDirSync(path.dirname(screenshotPath));
    await walkthrough.screenshot({ path: screenshotPath });
    console.log(`\n✓ Screenshot saved: ${screenshotPath}`);
  }
  
  await page.close();
  await context.close();
  await browser.close();
}

if (require.main === module) {
  verifyRiveLoading().catch(console.error);
}

module.exports = { verifyRiveLoading };
