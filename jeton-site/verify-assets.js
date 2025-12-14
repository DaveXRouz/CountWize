/**
 * Asset Verification Script
 * Compares local assets with live site to ensure everything is downloaded
 */

const fs = require('fs-extra');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');
const crypto = require('crypto');

const BASE_URL = 'https://www.jeton.com';
const OUTPUT_DIR = __dirname;

/**
 * Get file size
 */
function getFileSize(filePath) {
  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return fs.statSync(filePath).size;
    }
  } catch (e) {
    return null;
  }
  return null;
}

/**
 * Calculate file hash
 */
function getFileHash(filePath) {
  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const content = fs.readFileSync(filePath);
      return crypto.createHash('md5').update(content).digest('hex');
    }
  } catch (e) {
    return null;
  }
  return null;
}

/**
 * Get remote file info
 */
function getRemoteFileInfo(url) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    const options = {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    };
    
    const req = client.request(url, options, (res) => {
      if (res.statusCode === 200) {
        resolve({
          size: parseInt(res.headers['content-length'] || '0', 10),
          statusCode: res.statusCode
        });
      } else if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow redirect
        getRemoteFileInfo(res.headers.location).then(resolve).catch(reject);
      } else {
        resolve({
          size: 0,
          statusCode: res.statusCode,
          error: `HTTP ${res.statusCode}`
        });
      }
    });
    
    req.on('error', reject);
    req.end();
  });
}

/**
 * Find all asset references in HTML files
 */
function findAssetsInHTML(htmlFile) {
  const assets = new Set();
  
  if (!fs.existsSync(htmlFile)) {
    return assets;
  }
  
  const content = fs.readFileSync(htmlFile, 'utf8');
  
  // Find all href and src attributes
  const regex = /(href|src|srcset)=["']([^"']+)["']/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const url = match[2];
    
    // Skip external URLs
    if (url.startsWith('http://') || url.startsWith('https://')) {
      if (url.startsWith(BASE_URL)) {
        assets.add(url);
      }
      continue;
    }
    
    // Skip data URLs and special protocols
    if (url.startsWith('data:') || url.startsWith('mailto:') || url.startsWith('tel:')) {
      continue;
    }
    
    // Convert relative to absolute
    if (url.startsWith('/')) {
      assets.add(BASE_URL + url);
    } else {
      // Relative path - construct from HTML file location
      const htmlDir = path.dirname(htmlFile);
      const relativePath = path.relative(OUTPUT_DIR, path.join(htmlDir, url));
      assets.add(BASE_URL + '/' + relativePath.replace(/\\/g, '/'));
    }
  }
  
  // Also find in srcset (comma-separated)
  const srcsetRegex = /srcset=["']([^"']+)["']/g;
  while ((match = srcsetRegex.exec(content)) !== null) {
    const srcset = match[1];
    srcset.split(',').forEach(item => {
      const url = item.trim().split(/\s+/)[0];
      if (url.startsWith(BASE_URL)) {
        assets.add(url);
      } else if (url.startsWith('/')) {
        assets.add(BASE_URL + url);
      }
    });
  }
  
  return assets;
}

/**
 * Verify a single asset
 */
async function verifyAsset(assetUrl) {
  const localPath = urlToLocalPath(assetUrl);
  
  if (!localPath) {
    return {
      url: assetUrl,
      status: 'skip',
      reason: 'External or invalid URL'
    };
  }
  
  const localExists = fs.existsSync(localPath) && fs.statSync(localPath).isFile();
  const localSize = localExists ? getFileSize(localPath) : 0;
  
  try {
    const remoteInfo = await getRemoteFileInfo(assetUrl);
    
    if (remoteInfo.statusCode !== 200) {
      return {
        url: assetUrl,
        localPath,
        status: 'error',
        error: `Remote returned ${remoteInfo.statusCode}`
      };
    }
    
    if (!localExists) {
      return {
        url: assetUrl,
        localPath,
        status: 'missing',
        remoteSize: remoteInfo.size
      };
    }
    
    if (localSize !== remoteInfo.size) {
      return {
        url: assetUrl,
        localPath,
        status: 'mismatch',
        localSize,
        remoteSize: remoteInfo.size
      };
    }
    
    return {
      url: assetUrl,
      localPath,
      status: 'ok',
      size: localSize
    };
    
  } catch (error) {
    return {
      url: assetUrl,
      localPath,
      status: 'error',
      error: error.message
    };
  }
}

/**
 * Convert URL to local path
 */
function urlToLocalPath(url) {
  try {
    const parsedUrl = new URL(url);
    const baseParsed = new URL(BASE_URL);
    
    if (parsedUrl.hostname !== baseParsed.hostname) {
      return null;
    }
    
    let filePath = parsedUrl.pathname;
    if (filePath.startsWith('/')) {
      filePath = filePath.substring(1);
    }
    
    if (!filePath || filePath.endsWith('/')) {
      return null;
    }
    
    return path.join(OUTPUT_DIR, filePath);
  } catch (e) {
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Starting asset verification...\n');
  
  // Find all HTML files
  const htmlFiles = [];
  function findHTMLFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        findHTMLFiles(filePath);
      } else if (file.endsWith('.html')) {
        htmlFiles.push(filePath);
      }
    }
  }
  
  findHTMLFiles(OUTPUT_DIR);
  console.log(`Found ${htmlFiles.length} HTML files\n`);
  
  // Collect all assets
  const allAssets = new Set();
  for (const htmlFile of htmlFiles) {
    const assets = findAssetsInHTML(htmlFile);
    assets.forEach(a => allAssets.add(a));
  }
  
  console.log(`Found ${allAssets.size} unique assets to verify\n`);
  
  // Verify assets
  const results = {
    ok: [],
    missing: [],
    mismatch: [],
    error: [],
    skip: []
  };
  
  let count = 0;
  for (const assetUrl of allAssets) {
    count++;
    process.stdout.write(`\rVerifying ${count}/${allAssets.size}...`);
    
    const result = await verifyAsset(assetUrl);
    results[result.status].push(result);
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  console.log('\n\n=== Verification Results ===\n');
  console.log(`OK: ${results.ok.length}`);
  console.log(`Missing: ${results.missing.length}`);
  console.log(`Size Mismatch: ${results.mismatch.length}`);
  console.log(`Errors: ${results.error.length}`);
  console.log(`Skipped: ${results.skip.length}`);
  
  if (results.missing.length > 0) {
    console.log('\n=== Missing Assets ===');
    results.missing.forEach(r => {
      console.log(`${r.url} -> ${r.localPath}`);
    });
  }
  
  if (results.mismatch.length > 0) {
    console.log('\n=== Size Mismatches ===');
    results.mismatch.forEach(r => {
      console.log(`${r.url}: local=${r.localSize}, remote=${r.remoteSize}`);
    });
  }
  
  if (results.error.length > 0) {
    console.log('\n=== Errors ===');
    results.error.forEach(r => {
      console.log(`${r.url}: ${r.error}`);
    });
  }
  
  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: allAssets.size,
      ok: results.ok.length,
      missing: results.missing.length,
      mismatch: results.mismatch.length,
      error: results.error.length,
      skip: results.skip.length
    },
    results: {
      missing: results.missing,
      mismatch: results.mismatch,
      error: results.error
    }
  };
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'asset-verification-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('\n\nReport saved to asset-verification-report.json');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { verifyAsset, findAssetsInHTML };

