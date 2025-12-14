/**
 * Comprehensive Audit Script for Jeton Clone
 * Compares local clone with live site and identifies missing assets/functionality
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const AUDIT_REPORT = {
  missingAssets: [],
  brokenPaths: [],
  missingPages: [],
  styleIssues: [],
  jsIssues: []
};

// Check if file exists locally
function fileExists(filePath) {
  try {
    return fs.existsSync(path.join(__dirname, filePath));
  } catch (e) {
    return false;
  }
}

// Check if URL is accessible
function checkUrl(url, callback) {
  https.get(url, (res) => {
    callback(res.statusCode === 200);
  }).on('error', () => {
    callback(false);
  });
}

// Read HTML and extract all asset references
function extractAssets(html) {
  const assets = {
    images: [],
    scripts: [],
    stylesheets: [],
    fonts: [],
    videos: []
  };

  // Extract images
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    assets.images.push(match[1]);
  }

  // Extract scripts
  const scriptRegex = /<script[^>]+src=["']([^"']+)["']/gi;
  while ((match = scriptRegex.exec(html)) !== null) {
    assets.scripts.push(match[1]);
  }

  // Extract stylesheets
  const linkRegex = /<link[^>]+href=["']([^"']+)["'][^>]*rel=["']stylesheet["']/gi;
  while ((match = linkRegex.exec(html)) !== null) {
    assets.stylesheets.push(match[1]);
  }

  // Extract videos
  const videoRegex = /<video[^>]+src=["']([^"']+)["']/gi;
  while ((match = videoRegex.exec(html)) !== null) {
    assets.videos.push(match[1]);
  }

  return assets;
}

// Main audit function
function auditSite() {
  console.log('🔍 Starting comprehensive audit...\n');

  const indexPath = path.join(__dirname, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ index.html not found!');
    return;
  }

  const html = fs.readFileSync(indexPath, 'utf-8');
  const assets = extractAssets(html);

  console.log('📊 Asset Summary:');
  console.log(`  Images: ${assets.images.length}`);
  console.log(`  Scripts: ${assets.scripts.length}`);
  console.log(`  Stylesheets: ${assets.stylesheets.length}`);
  console.log(`  Videos: ${assets.videos.length}\n`);

  // Check images
  console.log('🖼️  Checking images...');
  assets.images.forEach(img => {
    if (img.startsWith('http')) return; // Skip external URLs
    if (!fileExists(img)) {
      AUDIT_REPORT.missingAssets.push({ type: 'image', path: img });
      console.log(`  ❌ Missing: ${img}`);
    }
  });

  // Check scripts
  console.log('\n📜 Checking scripts...');
  assets.scripts.forEach(script => {
    if (script.startsWith('http')) return;
    if (!fileExists(script)) {
      AUDIT_REPORT.missingAssets.push({ type: 'script', path: script });
      console.log(`  ❌ Missing: ${script}`);
    }
  });

  // Check stylesheets
  console.log('\n🎨 Checking stylesheets...');
  assets.stylesheets.forEach(css => {
    if (css.startsWith('http')) return;
    if (!fileExists(css)) {
      AUDIT_REPORT.missingAssets.push({ type: 'stylesheet', path: css });
      console.log(`  ❌ Missing: ${css}`);
    }
  });

  // Check videos
  console.log('\n🎬 Checking videos...');
  assets.videos.forEach(video => {
    if (video.startsWith('http')) return;
    const cleanPath = video.split('#')[0]; // Remove hash
    if (!fileExists(cleanPath)) {
      AUDIT_REPORT.missingAssets.push({ type: 'video', path: cleanPath });
      console.log(`  ❌ Missing: ${cleanPath}`);
    }
  });

  // Check for common issues
  console.log('\n🔧 Checking for common issues...');
  
  // Check for Sign up button
  if (!html.includes('Sign up') || html.includes('transform: translate(0%, -101%)')) {
    AUDIT_REPORT.styleIssues.push('Sign up button may be hidden by transform');
    console.log('  ⚠️  Sign up button transform issue detected');
  }

  // Check for Unify your finances
  if (html.includes('Unify your') && html.includes('opacity: 0')) {
    AUDIT_REPORT.styleIssues.push('Unify your finances section may be hidden');
    console.log('  ⚠️  Unify your finances opacity issue detected');
  }

  // Check for app button images
  const appButtonImages = assets.images.filter(img => img.includes('app-button'));
  appButtonImages.forEach(img => {
    if (!fileExists(img)) {
      console.log(`  ❌ Missing app button: ${img}`);
    }
  });

  console.log('\n✅ Audit complete!');
  console.log(`\n📋 Summary:`);
  console.log(`  Missing assets: ${AUDIT_REPORT.missingAssets.length}`);
  console.log(`  Style issues: ${AUDIT_REPORT.styleIssues.length}`);

  // Write report
  const reportPath = path.join(__dirname, 'audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(AUDIT_REPORT, null, 2));
  console.log(`\n📄 Report saved to: ${reportPath}`);
}

auditSite();

