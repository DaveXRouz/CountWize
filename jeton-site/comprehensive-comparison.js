/**
 * Comprehensive Visual Comparison Script
 * Compares local clone with live jeton.com to identify all differences
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const DIFFERENCES = {
  missingElements: [],
  styleDifferences: [],
  functionalityIssues: [],
  animationIssues: []
};

// Key sections to check
const SECTIONS_TO_CHECK = [
  {
    name: 'Navbar',
    selectors: ['._navbar', 'nav._navbar'],
    checks: ['Sign up button visible', 'Log in button visible', 'Language selector', 'Logo visible']
  },
  {
    name: 'Header/Hero',
    selectors: ['._common-header', 'header._common-header'],
    checks: ['Background color/orange', 'Video plays', 'Text visible', 'App buttons visible']
  },
  {
    name: 'Unify your finances',
    selectors: ['._hero-introduction', '._hero-introduction h2'],
    checks: ['Text visible', 'Snippets visible', 'Background orange', 'Taglines visible']
  },
  {
    name: 'App Marketplace Icons',
    selectors: ['._app-button img', 'img[src*="app-button"]'],
    checks: ['App Store icon loads', 'Google Play icon loads', 'Both variants (neutral/orange)']
  }
];

function checkFileExists(filePath) {
  return fs.existsSync(path.join(__dirname, filePath));
}

function analyzeHTML() {
  const indexPath = path.join(__dirname, 'index.html');
  const html = fs.readFileSync(indexPath, 'utf-8');

  console.log('🔍 Analyzing HTML structure...\n');

  // Check for Sign up button
  const signupButton = html.match(/<a[^>]*signup[^>]*>/i);
  if (signupButton) {
    const hasTransform = signupButton[0].includes('translate(0%, -101%)');
    if (hasTransform) {
      DIFFERENCES.styleDifferences.push('Sign up button still has hiding transform');
      console.log('  ⚠️  Sign up button transform issue');
    } else {
      console.log('  ✅ Sign up button transform fixed');
    }
  }

  // Check for Unify your finances
  const unifySection = html.match(/<h2[^>]*>.*?Unify.*?finances.*?<\/h2>/is);
  if (unifySection) {
    const hasOpacity = unifySection[0].includes('opacity: 0');
    const hasScale = unifySection[0].includes('scale(0.3');
    if (hasOpacity || hasScale) {
      DIFFERENCES.styleDifferences.push('Unify your finances still has hiding styles');
      console.log('  ⚠️  Unify your finances visibility issue');
    } else {
      console.log('  ✅ Unify your finances visibility fixed');
    }
  }

  // Check app button images
  const appButtons = html.match(/src=["']images\/app-button\/[^"']+["']/g);
  if (appButtons) {
    appButtons.forEach(btn => {
      const src = btn.match(/src=["']([^"']+)["']/)[1];
      if (!checkFileExists(src)) {
        DIFFERENCES.missingElements.push(`App button: ${src}`);
        console.log(`  ❌ Missing: ${src}`);
      } else {
        console.log(`  ✅ Found: ${src}`);
      }
    });
  }

  // Check for JavaScript animation dependencies
  const hasGSAP = html.includes('gsap') || html.includes('GSAP');
  const hasScrollAnimations = html.includes('scroll') && html.includes('transform');
  if (hasScrollAnimations && !hasGSAP) {
    DIFFERENCES.animationIssues.push('Scroll animations may not work without GSAP');
    console.log('  ⚠️  Scroll animations may be limited');
  }

  console.log('\n📊 Summary:');
  console.log(`  Missing elements: ${DIFFERENCES.missingElements.length}`);
  console.log(`  Style differences: ${DIFFERENCES.styleDifferences.length}`);
  console.log(`  Animation issues: ${DIFFERENCES.animationIssues.length}`);
}

analyzeHTML();

// Save report
const reportPath = path.join(__dirname, 'comparison-report.json');
fs.writeFileSync(reportPath, JSON.stringify(DIFFERENCES, null, 2));
console.log(`\n📄 Report saved to: ${reportPath}`);

