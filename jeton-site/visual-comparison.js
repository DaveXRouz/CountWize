/**
 * Visual Comparison Script using Playwright
 * Compares live site vs local site pixel-by-pixel
 */

const { chromium } = require('playwright');
const fs = require('fs-extra');
const path = require('path');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

const LIVE_URL = 'https://www.jeton.com';
const LOCAL_URL = 'http://localhost:9000';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const DIFF_DIR = path.join(__dirname, 'screenshots', 'diffs');

/**
 * Take screenshot of a page
 */
async function takeScreenshot(page, name, scrollY = 0) {
  if (scrollY > 0) {
    await page.evaluate((y) => {
      window.scrollTo(0, y);
    }, scrollY);
    await page.waitForTimeout(1000); // Wait for scroll animations
  }
  
  const screenshotPath = path.join(SCREENSHOTS_DIR, `${name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: false });
  return screenshotPath;
}

/**
 * Compare two images pixel-by-pixel
 */
function compareImages(img1Path, img2Path, diffPath) {
  const img1 = PNG.sync.read(fs.readFileSync(img1Path));
  const img2 = PNG.sync.read(fs.readFileSync(img2Path));
  
  const { width, height } = img1;
  const diff = new PNG({ width, height });
  
  const numDiffPixels = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    {
      threshold: 0.1,
      alpha: 0.1,
      diffColor: [255, 0, 0],
      diffColorAlt: [0, 0, 255]
    }
  );
  
  fs.writeFileSync(diffPath, PNG.sync.write(diff));
  
  const diffPercent = (numDiffPixels / (width * height)) * 100;
  return { numDiffPixels, diffPercent, totalPixels: width * height };
}

/**
 * Test walkthrough section specifically
 */
async function testWalkthroughSection(page, isLocal) {
  console.log(`\nTesting walkthrough section (${isLocal ? 'local' : 'live'})...`);
  
  // Scroll to walkthrough section
  const walkthroughSection = await page.$('._jeton-walkthrough');
  if (!walkthroughSection) {
    return { error: 'Walkthrough section not found' };
  }
  
  await walkthroughSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000); // Wait for animations
  
  // Check for Rive canvas elements
  const canvasElements = await page.$$('._jeton-walkthrough ._rive-asset');
  console.log(`  Found ${canvasElements.length} Rive canvas elements`);
  
  // Check for phone UI content
  const articles = await page.$$('._jeton-walkthrough article');
  console.log(`  Found ${articles.length} article elements`);
  
  // Check for "Simple" and "fast & safe" text
  const simpleText = await page.$('text=Simple');
  const fastSafeText = await page.$('text=fast & safe');
  
  // Check for Restart button
  const restartButton = await page.$('._jeton-walkthrough .restart button');
  
  // Check for stepper
  const stepper = await page.$('._jeton-walkthrough ._stepper');
  
  // Get section visibility
  const sectionInfo = await page.evaluate(() => {
    const section = document.querySelector('._jeton-walkthrough');
    if (!section) return null;
    
    const rect = section.getBoundingClientRect();
    const style = window.getComputedStyle(section);
    
    return {
      exists: true,
      visible: rect.width > 0 && rect.height > 0 && style.display !== 'none',
      width: rect.width,
      height: rect.height,
      opacity: style.opacity,
      backgroundColor: style.backgroundColor
    };
  });
  
  // Check canvas visibility
  const canvasInfo = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('._jeton-walkthrough ._rive-asset'));
    return canvases.map(canvas => {
      const rect = canvas.getBoundingClientRect();
      const style = window.getComputedStyle(canvas);
      return {
        visible: rect.width > 0 && rect.height > 0,
        opacity: style.opacity,
        width: rect.width,
        height: rect.height
      };
    });
  });
  
  return {
    section: sectionInfo,
    canvasCount: canvasElements.length,
    canvasInfo,
    articleCount: articles.length,
    hasSimpleText: !!simpleText,
    hasFastSafeText: !!fastSafeText,
    hasRestartButton: !!restartButton,
    hasStepper: !!stepper
  };
}

/**
 * Main comparison function
 */
async function compareSites() {
  console.log('Starting visual comparison...\n');
  
  // Ensure directories exist
  fs.ensureDirSync(SCREENSHOTS_DIR);
  fs.ensureDirSync(DIFF_DIR);
  
  const browser = await chromium.launch({ headless: false });
  const results = {
    timestamp: new Date().toISOString(),
    comparisons: [],
    walkthrough: {}
  };
  
  try {
    // Test live site
    console.log('Testing live site...');
    const liveContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    const livePage = await liveContext.newPage();
    
    await livePage.goto(LIVE_URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await livePage.waitForTimeout(8000); // Wait for full load and animations
    
    // Test walkthrough on live
    const liveWalkthrough = await testWalkthroughSection(livePage, false);
    results.walkthrough.live = liveWalkthrough;
    
    // Take screenshots at different scroll positions
    const scrollPositions = [
      { name: 'live-top', y: 0 },
      { name: 'live-walkthrough', y: 2000 },
      { name: 'live-middle', y: 4000 }
    ];
    
    for (const pos of scrollPositions) {
      const screenshot = await takeScreenshot(livePage, pos.name, pos.y);
      console.log(`  Screenshot: ${pos.name}`);
    }
    
    await livePage.close();
    await liveContext.close();
    
    // Test local site
    console.log('\nTesting local site...');
    const localContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    const localPage = await localContext.newPage();
    
    await localPage.goto(LOCAL_URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await localPage.waitForTimeout(8000);
    
    // Test walkthrough on local
    const localWalkthrough = await testWalkthroughSection(localPage, true);
    results.walkthrough.local = localWalkthrough;
    
    // Take screenshots at same positions
    for (const pos of scrollPositions) {
      const localName = pos.name.replace('live-', 'local-');
      const screenshot = await takeScreenshot(localPage, localName, pos.y);
      console.log(`  Screenshot: ${localName}`);
    }
    
    await localPage.close();
    await localContext.close();
    
    // Compare screenshots
    console.log('\nComparing screenshots...');
    for (const pos of scrollPositions) {
      const livePath = path.join(SCREENSHOTS_DIR, `${pos.name}.png`);
      const localPath = path.join(SCREENSHOTS_DIR, `${pos.name.replace('live-', 'local-')}.png`);
      const diffPath = path.join(DIFF_DIR, `${pos.name}-diff.png`);
      
      if (fs.existsSync(livePath) && fs.existsSync(localPath)) {
        const comparison = compareImages(livePath, localPath, diffPath);
        results.comparisons.push({
          name: pos.name,
          ...comparison
        });
        console.log(`  ${pos.name}: ${comparison.diffPercent.toFixed(2)}% different (${comparison.numDiffPixels} pixels)`);
      }
    }
    
    // Walkthrough comparison
    console.log('\n=== Walkthrough Section Comparison ===');
    console.log('Live:', JSON.stringify(liveWalkthrough, null, 2));
    console.log('Local:', JSON.stringify(localWalkthrough, null, 2));
    
    // Save results
    const reportPath = path.join(__dirname, 'visual-comparison-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`\n✓ Report saved to: ${reportPath}`);
    
  } finally {
    await browser.close();
  }
  
  return results;
}

/**
 * Main function
 */
async function main() {
  try {
    await compareSites();
  } catch (error) {
    console.error('Error during comparison:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { compareSites, testWalkthroughSection };
