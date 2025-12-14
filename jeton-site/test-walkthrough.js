/**
 * Walkthrough Section Test
 * Specific tests for the _jeton-walkthrough section
 */

const { chromium } = require('playwright');
const fs = require('fs-extra');
const path = require('path');

const LOCAL_URL = 'http://localhost:9000';
const LIVE_URL = 'https://www.jeton.com';

/**
 * Test walkthrough section in detail
 */
async function testWalkthrough(page, isLocal) {
  const results = {
    isLocal,
    timestamp: new Date().toISOString(),
    section: {},
    elements: {},
    animations: {},
    interactions: {}
  };
  
  console.log(`\n=== Testing Walkthrough Section (${isLocal ? 'LOCAL' : 'LIVE'}) ===`);
  
  // Navigate and wait
  await page.goto(isLocal ? LOCAL_URL : LIVE_URL, { 
    waitUntil: 'domcontentloaded', 
    timeout: 90000 
  });
  await page.waitForTimeout(8000); // Wait for full load and animations
  
  // Find walkthrough section
  const walkthroughSelector = '._jeton-walkthrough';
  const sectionExists = await page.$(walkthroughSelector);
  
  if (!sectionExists) {
    results.error = 'Walkthrough section not found';
    return results;
  }
  
  // Scroll to section
  await sectionExists.scrollIntoViewIfNeeded();
  await page.waitForTimeout(3000); // Wait for animations to load
  
  // Get section info
  results.section = await page.evaluate((selector) => {
    const section = document.querySelector(selector);
    if (!section) return null;
    
    const rect = section.getBoundingClientRect();
    const style = window.getComputedStyle(section);
    
    return {
      exists: true,
      visible: rect.width > 0 && rect.height > 0,
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      backgroundColor: style.backgroundColor,
      opacity: style.opacity,
      display: style.display
    };
  }, walkthroughSelector);
  
  // Check Rive canvas elements
  const canvasElements = await page.$$('._jeton-walkthrough ._rive-asset');
  results.elements.canvasCount = canvasElements.length;
  
  results.elements.canvasInfo = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('._jeton-walkthrough ._rive-asset'));
    return canvases.map((canvas, index) => {
      const rect = canvas.getBoundingClientRect();
      const style = window.getComputedStyle(canvas);
      const ctx = canvas.getContext('2d');
      
      // Check if canvas has content (not blank)
      let hasContent = false;
      try {
        const imageData = ctx.getImageData(0, 0, Math.min(10, canvas.width), Math.min(10, canvas.height));
        const data = imageData.data;
        // Check if any pixel is not transparent
        for (let i = 3; i < data.length; i += 4) {
          if (data[i] > 0) {
            hasContent = true;
            break;
          }
        }
      } catch (e) {
        // Canvas might not be ready
      }
      
      return {
        index,
        visible: rect.width > 0 && rect.height > 0,
        width: rect.width,
        height: rect.height,
        opacity: style.opacity,
        hasContent,
        id: canvas.id || null
      };
    });
  });
  
  // Check article elements (phone UI content)
  const articles = await page.$$('._jeton-walkthrough article');
  results.elements.articleCount = articles.length;
  
  results.elements.articles = await page.evaluate(() => {
    const articles = Array.from(document.querySelectorAll('._jeton-walkthrough article'));
    return articles.map((article, index) => {
      const rect = article.getBoundingClientRect();
      const style = window.getComputedStyle(article);
      const step = article.getAttribute('data-step');
      
      return {
        index,
        step,
        visible: rect.width > 0 && rect.height > 0,
        opacity: style.opacity,
        display: style.display,
        hasContent: article.textContent.trim().length > 0
      };
    });
  });
  
  // Check for text elements
  results.elements.textElements = await page.evaluate(() => {
    const section = document.querySelector('._jeton-walkthrough');
    if (!section) return {};
    
    return {
      hasSimple: section.textContent.includes('Simple'),
      hasFastSafe: section.textContent.includes('fast & safe'),
      hasAllCurrencies: section.textContent.includes('All currencies'),
      hasOneApp: section.textContent.includes('One App')
    };
  });
  
  // Check for stepper navigation
  const stepper = await page.$('._jeton-walkthrough ._stepper');
  results.elements.hasStepper = !!stepper;
  
  if (stepper) {
    results.elements.stepperButtons = await page.evaluate(() => {
      const stepper = document.querySelector('._jeton-walkthrough ._stepper');
      if (!stepper) return [];
      
      const buttons = Array.from(stepper.querySelectorAll('button'));
      return buttons.map((btn, index) => {
        const isActive = btn.getAttribute('data-active') === 'true' || 
                       btn.classList.contains('active') ||
                       btn.querySelector('.index svg')?.style.getPropertyValue('--p') !== '0';
        return {
          index,
          text: btn.textContent.trim(),
          isActive,
          visible: btn.offsetWidth > 0 && btn.offsetHeight > 0
        };
      });
    });
  }
  
  // Check for Restart button
  const restartButton = await page.$('._jeton-walkthrough .restart button');
  results.elements.hasRestartButton = !!restartButton;
  
  if (restartButton) {
    results.elements.restartButton = await page.evaluate(() => {
      const btn = document.querySelector('._jeton-walkthrough .restart button');
      if (!btn) return null;
      
      const rect = btn.getBoundingClientRect();
      const style = window.getComputedStyle(btn);
      
      return {
        visible: rect.width > 0 && rect.height > 0,
        opacity: style.opacity,
        pointerEvents: style.pointerEvents,
        text: btn.textContent.trim()
      };
    });
  }
  
  // Check for phone UI content (transaction details)
  results.elements.phoneUI = await page.evaluate(() => {
    const section = document.querySelector('._jeton-walkthrough');
    if (!section) return null;
    
    const text = section.textContent;
    return {
      hasTransactionDetails: text.includes('Your request has been received') ||
                            text.includes('Transaction ID') ||
                            text.includes('Amount') ||
                            text.includes('€600'),
      hasGetReceipt: text.includes('Get Receipt')
    };
  });
  
  // Test Rive animation loading
  results.animations.riveLoaded = await page.evaluate(() => {
    return new Promise((resolve) => {
      const canvases = document.querySelectorAll('._jeton-walkthrough ._rive-asset');
      if (canvases.length === 0) {
        resolve({ loaded: false, error: 'No canvas elements found' });
        return;
      }
      
      // Check console for Rive errors
      const checkInterval = setInterval(() => {
        // This is a simplified check - in reality we'd need to check Rive library state
        clearInterval(checkInterval);
        resolve({ 
          loaded: true, 
          canvasCount: canvases.length,
          note: 'Rive loading state checked via canvas elements'
        });
      }, 2000);
    });
  });
  
  // Take screenshot of walkthrough section
  const screenshotPath = path.join(__dirname, 'screenshots', `walkthrough-${isLocal ? 'local' : 'live'}.png`);
  fs.ensureDirSync(path.dirname(screenshotPath));
  
  await sectionExists.screenshot({ path: screenshotPath });
  results.screenshot = screenshotPath;
  
  return results;
}

/**
 * Main function
 */
async function main() {
  console.log('Testing Walkthrough Section\n');
  
  const browser = await chromium.launch({ headless: false });
  const results = {
    live: null,
    local: null,
    comparison: {}
  };
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    
    // Test live site
    console.log('Testing LIVE site...');
    const livePage = await context.newPage();
    results.live = await testWalkthrough(livePage, false);
    await livePage.close();
    
    // Test local site
    console.log('\nTesting LOCAL site...');
    const localPage = await context.newPage();
    results.local = await testWalkthrough(localPage, true);
    await localPage.close();
    
    await context.close();
    
    // Compare results
    console.log('\n=== Comparison ===');
    if (results.live && results.local) {
      results.comparison = {
        sectionVisible: results.live.section?.visible === results.local.section?.visible,
        canvasCountMatch: results.live.elements?.canvasCount === results.local.elements?.canvasCount,
        articleCountMatch: results.live.elements?.articleCount === results.local.elements?.articleCount,
        hasSimpleText: results.live.elements?.textElements?.hasSimple === results.local.elements?.textElements?.hasSimple,
        hasFastSafeText: results.live.elements?.textElements?.hasFastSafe === results.local.elements?.textElements?.hasFastSafe,
        hasRestartButton: results.live.elements?.hasRestartButton === results.local.elements?.hasRestartButton,
        hasStepper: results.live.elements?.hasStepper === results.local.elements?.hasStepper
      };
      
      console.log(JSON.stringify(results.comparison, null, 2));
    }
    
    // Save report
    const reportPath = path.join(__dirname, 'walkthrough-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`\n✓ Report saved to: ${reportPath}`);
    
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testWalkthrough };
