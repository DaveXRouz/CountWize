/**
 * Comprehensive Visual Audit
 * Systematically tests every section and compares with live site
 */

const { chromium } = require('playwright');
const fs = require('fs-extra');
const path = require('path');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

const LIVE_URL = 'https://www.jeton.com';
const LOCAL_URL = 'http://localhost:9000';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots', 'audit');
const DIFF_DIR = path.join(__dirname, 'screenshots', 'audit-diffs');

/**
 * Sections to test
 */
const SECTIONS = [
  {
    name: 'hero',
    selector: '._common-header',
    description: 'Hero section with video background'
  },
  {
    name: 'unify-finances',
    selector: '._hero-introduction',
    description: 'Unify your finances section'
  },
  {
    name: 'walkthrough',
    selector: '._jeton-walkthrough',
    description: 'Walkthrough section with phone UI'
  },
  {
    name: 'mobile-app-hero',
    selector: '._mobile-app-hero',
    description: 'Mobile app hero section'
  },
  {
    name: 'jeton-card',
    selector: '._jeton-card-overview',
    description: 'Jeton Card overview'
  },
  {
    name: 'currency-calculator',
    selector: '._currency-exchange-calculator',
    description: 'Currency exchange calculator'
  },
  {
    name: 'testimonials',
    selector: '._client-testimonials',
    description: 'Client testimonials'
  },
  {
    name: 'extra-bold-hero',
    selector: '._extra-bold-hero',
    description: 'Extra bold hero section'
  },
  {
    name: 'footer',
    selector: '._footer',
    description: 'Footer section'
  }
];

/**
 * Test a specific section
 */
async function testSection(page, section, isLocal) {
  const results = {
    name: section.name,
    isLocal,
    found: false,
    visible: false,
    dimensions: null,
    screenshot: null,
    elements: {}
  };
  
  try {
    const element = await page.$(section.selector);
    
    if (!element) {
      results.error = 'Section not found';
      return results;
    }
    
    results.found = true;
    
    // Scroll to section
    await element.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000); // Wait for animations
    
    // Get section info
    const info = await page.evaluate((selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      
      return {
        visible: rect.width > 0 && rect.height > 0 && style.display !== 'none',
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        opacity: style.opacity,
        backgroundColor: style.backgroundColor
      };
    }, section.selector);
    
    results.visible = info?.visible || false;
    results.dimensions = info;
    
    // Take screenshot
    const screenshotPath = path.join(SCREENSHOTS_DIR, `${section.name}-${isLocal ? 'local' : 'live'}.png`);
    fs.ensureDirSync(path.dirname(screenshotPath));
    
    await element.screenshot({ path: screenshotPath });
    results.screenshot = screenshotPath;
    
    // Section-specific checks
    if (section.name === 'walkthrough') {
      results.elements = await page.evaluate(() => {
        const section = document.querySelector('._jeton-walkthrough');
        if (!section) return {};
        
        return {
          canvasCount: document.querySelectorAll('._jeton-walkthrough ._rive-asset').length,
          articleCount: document.querySelectorAll('._jeton-walkthrough article').length,
          hasSimpleText: section.textContent.includes('Simple'),
          hasFastSafeText: section.textContent.includes('fast & safe'),
          hasRestartButton: !!document.querySelector('._jeton-walkthrough .restart button'),
          hasStepper: !!document.querySelector('._jeton-walkthrough ._stepper')
        };
      });
    } else if (section.name === 'unify-finances') {
      results.elements = await page.evaluate(() => {
        const section = document.querySelector('._hero-introduction');
        if (!section) return {};
        
        const h2 = section.querySelector('h2');
        return {
          hasH2: !!h2,
          h2Text: h2 ? h2.textContent.trim() : '',
          h2Visible: h2 ? window.getComputedStyle(h2).opacity !== '0' : false
        };
      });
    } else if (section.name === 'hero') {
      results.elements = await page.evaluate(() => {
        const section = document.querySelector('._common-header');
        if (!section) return {};
        
        return {
          hasVideo: !!section.querySelector('video'),
          hasH1: !!section.querySelector('h1'),
          hasAppButtons: document.querySelectorAll('._app-button').length
        };
      });
    }
    
  } catch (error) {
    results.error = error.message;
  }
  
  return results;
}

/**
 * Compare section screenshots
 */
function compareSectionScreenshots(livePath, localPath, diffPath) {
  if (!fs.existsSync(livePath) || !fs.existsSync(localPath)) {
    return null;
  }
  
  try {
    const img1 = PNG.sync.read(fs.readFileSync(livePath));
    const img2 = PNG.sync.read(fs.readFileSync(localPath));
    
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
  } catch (error) {
    return { error: error.message };
  }
}

/**
 * Main audit function
 */
async function runVisualAudit() {
  console.log('Starting comprehensive visual audit...\n');
  
  // Ensure directories exist
  fs.ensureDirSync(SCREENSHOTS_DIR);
  fs.ensureDirSync(DIFF_DIR);
  
  const browser = await chromium.launch({ headless: false });
  const auditResults = {
    timestamp: new Date().toISOString(),
    sections: {},
    comparisons: {},
    summary: {}
  };
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    
    // Test live site
    console.log('=== Testing LIVE Site ===');
    const livePage = await context.newPage();
    await livePage.goto(LIVE_URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await livePage.waitForTimeout(8000);
    
    for (const section of SECTIONS) {
      console.log(`\nTesting ${section.name} (live)...`);
      auditResults.sections[section.name] = {
        live: await testSection(livePage, section, false)
      };
    }
    
    await livePage.close();
    
    // Test local site
    console.log('\n=== Testing LOCAL Site ===');
    const localPage = await context.newPage();
    await localPage.goto(LOCAL_URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await localPage.waitForTimeout(8000);
    
    for (const section of SECTIONS) {
      console.log(`\nTesting ${section.name} (local)...`);
      if (!auditResults.sections[section.name]) {
        auditResults.sections[section.name] = {};
      }
      auditResults.sections[section.name].local = await testSection(localPage, section, true);
    }
    
    await localPage.close();
    await context.close();
    
    // Compare sections
    console.log('\n=== Comparing Sections ===');
    for (const section of SECTIONS) {
      const liveResult = auditResults.sections[section.name]?.live;
      const localResult = auditResults.sections[section.name]?.local;
      
      if (liveResult?.screenshot && localResult?.screenshot) {
        const diffPath = path.join(DIFF_DIR, `${section.name}-diff.png`);
        const comparison = compareSectionScreenshots(
          liveResult.screenshot,
          localResult.screenshot,
          diffPath
        );
        
        if (comparison) {
          auditResults.comparisons[section.name] = {
            ...comparison,
            diffImage: diffPath
          };
          console.log(`  ${section.name}: ${comparison.diffPercent?.toFixed(2) || 'N/A'}% different`);
        }
      }
      
      // Element comparison
      if (liveResult?.elements && localResult?.elements) {
        const elementDiff = {};
        const allKeys = new Set([
          ...Object.keys(liveResult.elements),
          ...Object.keys(localResult.elements)
        ]);
        
        for (const key of allKeys) {
          if (liveResult.elements[key] !== localResult.elements[key]) {
            elementDiff[key] = {
              live: liveResult.elements[key],
              local: localResult.elements[key]
            };
          }
        }
        
        if (Object.keys(elementDiff).length > 0) {
          auditResults.comparisons[section.name].elementDifferences = elementDiff;
        }
      }
    }
    
    // Generate summary
    const sectionsFound = Object.values(auditResults.sections).filter(s => s.live?.found && s.local?.found).length;
    const sectionsVisible = Object.values(auditResults.sections).filter(s => s.live?.visible && s.local?.visible).length;
    const avgDiffPercent = Object.values(auditResults.comparisons)
      .map(c => c.diffPercent)
      .filter(p => p !== undefined)
      .reduce((a, b, i, arr) => a + b / arr.length, 0);
    
    auditResults.summary = {
      totalSections: SECTIONS.length,
      sectionsFound,
      sectionsVisible,
      averageDifferencePercent: avgDiffPercent,
      sectionsWithDifferences: Object.keys(auditResults.comparisons).filter(
        name => auditResults.comparisons[name].diffPercent > 1
      ).length
    };
    
    console.log('\n=== Audit Summary ===');
    console.log(JSON.stringify(auditResults.summary, null, 2));
    
    // Save report
    const reportPath = path.join(__dirname, 'visual-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(auditResults, null, 2));
    console.log(`\n✓ Report saved to: ${reportPath}`);
    
  } finally {
    await browser.close();
  }
  
  return auditResults;
}

/**
 * Main function
 */
async function main() {
  try {
    await runVisualAudit();
  } catch (error) {
    console.error('Error during audit:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { runVisualAudit, testSection };
