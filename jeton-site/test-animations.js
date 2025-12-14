/**
 * Animation Testing Script
 * Tests scroll animations and verifies they match the live site
 */

const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

const BASE_URL = 'https://www.jeton.com';
const LOCAL_URL = 'http://localhost:9000';

/**
 * Test animations on a page
 */
async function testAnimations(browser, url, isLocal = false) {
  const page = await browser.newPage();
  const results = {
    url,
    isLocal,
    heroSection: {},
    scrollPositions: []
  };
  
  try {
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Wait for page to load
    await page.waitForTimeout(3000);
    
    // Check hero-introduction section
    const heroInfo = await page.evaluate(() => {
      const hero = document.querySelector('._hero-introduction');
      if (!hero) return { exists: false };
      
      const h2 = hero.querySelector('h2');
      if (!h2) return { exists: true, hasH2: false };
      
      const style = window.getComputedStyle(h2);
      const rect = h2.getBoundingClientRect();
      
      return {
        exists: true,
        hasH2: true,
        text: h2.textContent.trim(),
        opacity: style.opacity,
        transform: style.transform,
        visible: rect.width > 0 && rect.height > 0 && style.opacity !== '0',
        rect: {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left
        }
      };
    });
    
    results.heroSection = heroInfo;
    
    // Scroll through page and capture states
    const scrollSteps = [0, 0.25, 0.5, 0.75, 1.0];
    
    for (const step of scrollSteps) {
      await page.evaluate((scrollPercent) => {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        window.scrollTo(0, maxScroll * scrollPercent);
      }, step);
      
      await page.waitForTimeout(500);
      
      const state = await page.evaluate(() => {
        const hero = document.querySelector('._hero-introduction');
        if (!hero) return null;
        
        const h2 = hero.querySelector('h2');
        if (!h2) return null;
        
        const style = window.getComputedStyle(h2);
        const rect = h2.getBoundingClientRect();
        
        return {
          scrollY: window.scrollY,
          opacity: style.opacity,
          transform: style.transform,
          visible: rect.width > 0 && rect.height > 0 && style.opacity !== '0',
          rect: {
            width: rect.width,
            height: rect.height
          }
        };
      });
      
      if (state) {
        results.scrollPositions.push({
          scrollPercent: step,
          ...state
        });
      }
    }
    
    // Take screenshot
    const screenshotPath = path.join(__dirname, `screenshot-${isLocal ? 'local' : 'live'}-${Date.now()}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    results.screenshot = screenshotPath;
    
    return results;
    
  } catch (error) {
    results.error = error.message;
    return results;
  } finally {
    await page.close();
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Starting animation tests...\n');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    // Test live site
    console.log('Testing live site...');
    const liveResults = await testAnimations(browser, BASE_URL, false);
    
    // Test local site
    console.log('Testing local site...');
    const localResults = await testAnimations(browser, LOCAL_URL, true);
    
    // Compare results
    console.log('\n=== Comparison ===\n');
    console.log('Live Site Hero Section:');
    console.log(JSON.stringify(liveResults.heroSection, null, 2));
    console.log('\nLocal Site Hero Section:');
    console.log(JSON.stringify(localResults.heroSection, null, 2));
    
    // Save report
    const report = {
      timestamp: new Date().toISOString(),
      live: liveResults,
      local: localResults,
      comparison: {
        heroExists: liveResults.heroSection.exists === localResults.heroSection.exists,
        heroVisible: liveResults.heroSection.visible === localResults.heroSection.visible,
        scrollStatesMatch: JSON.stringify(liveResults.scrollPositions) === JSON.stringify(localResults.scrollPositions)
      }
    };
    
    fs.writeFileSync(
      path.join(__dirname, 'animation-test-report.json'),
      JSON.stringify(report, null, 2)
    );
    
    console.log('\nReport saved to animation-test-report.json');
    
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testAnimations };

