/**
 * Comprehensive Jeton.com Scraper using Puppeteer
 * Fully renders pages with JavaScript execution and downloads all assets
 */

const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const BASE_URL = 'https://www.jeton.com';
const OUTPUT_DIR = __dirname;
const ASSETS_DIR = path.join(OUTPUT_DIR, 'downloaded-assets');

// Pages to download
const PAGES = [
  { path: '/', file: 'index.html' },
  { path: '/jeton-card', file: 'jeton-card/index.html' },
  { path: '/fees', file: 'fees/index.html' },
  { path: '/about', file: 'about/index.html' },
  { path: '/newsroom', file: 'newsroom/index.html' },
  { path: '/partnerships', file: 'partnerships/index.html' },
  { path: '/privacy-policy', file: 'privacy-policy/index.html' },
  { path: '/cookie-policy', file: 'cookie-policy/index.html' },
  { path: '/terms-and-conditions', file: 'terms-and-conditions/index.html' },
  { path: '/aml-policy', file: 'aml-policy/index.html' }
];

// For testing, set TEST_MODE to true to only scrape homepage
const TEST_MODE = process.argv.includes('--test');
const PAGES_TO_SCRAPE = TEST_MODE ? PAGES.slice(0, 1) : PAGES;

// Track downloaded assets to avoid duplicates
const downloadedAssets = new Set();
const assetQueue = [];

/**
 * Download a file from URL
 */
async function downloadFile(url, outputPath) {
  if (downloadedAssets.has(url)) {
    return;
  }
  
  // Skip if outputPath is null or invalid
  if (!outputPath) {
    return;
  }
  
  // Skip if outputPath is a directory
  if (fs.existsSync(outputPath) && fs.statSync(outputPath).isDirectory()) {
    return;
  }
  
  downloadedAssets.add(url);

  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    fs.ensureDirSync(dir);
    
    // Skip if file already exists and is valid
    if (fs.existsSync(outputPath) && fs.statSync(outputPath).isFile()) {
      resolve();
      return;
    }

    const file = fs.createWriteStream(outputPath);
    
    client.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        file.close();
        return downloadFile(response.headers.location, outputPath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(outputPath)) {
          try { fs.unlinkSync(outputPath); } catch (e) {}
        }
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${url} -> ${outputPath}`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(outputPath)) {
        try { fs.unlinkSync(outputPath); } catch (e) {}
      }
      reject(err);
    });
  });
}

/**
 * Extract and queue assets from HTML
 */
function extractAssets(html, baseUrl) {
  const assets = [];
  
  // Extract CSS files
  const cssRegex = /<link[^>]+href=["']([^"']+\.css[^"']*)["'][^>]*>/gi;
  let match;
  while ((match = cssRegex.exec(html)) !== null) {
    const url = match[1].startsWith('http') ? match[1] : new URL(match[1], baseUrl).href;
    assets.push({ url, type: 'css' });
  }
  
  // Extract JS files
  const jsRegex = /<script[^>]+src=["']([^"']+\.js[^"']*)["'][^>]*>/gi;
  while ((match = jsRegex.exec(html)) !== null) {
    const url = match[1].startsWith('http') ? match[1] : new URL(match[1], baseUrl).href;
    assets.push({ url, type: 'js' });
  }
  
  // Extract images
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((match = imgRegex.exec(html)) !== null) {
    const url = match[1].startsWith('http') ? match[1] : new URL(match[1], baseUrl).href;
    if (!url.includes('data:') && !url.includes('blob:')) {
      assets.push({ url, type: 'image' });
    }
  }
  
  // Extract videos
  const videoRegex = /<video[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((match = videoRegex.exec(html)) !== null) {
    const url = match[1].startsWith('http') ? match[1] : new URL(match[1], baseUrl).href;
    assets.push({ url, type: 'video' });
  }
  
  // Extract source tags in video
  const sourceRegex = /<source[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((match = sourceRegex.exec(html)) !== null) {
    const url = match[1].startsWith('http') ? match[1] : new URL(match[1], baseUrl).href;
    assets.push({ url, type: 'video' });
  }
  
  // Extract fonts
  const fontRegex = /url\(["']?([^"')]+\.(woff|woff2)[^"')]*)["']?\)/gi;
  while ((match = fontRegex.exec(html)) !== null) {
    const url = match[1].startsWith('http') ? match[1] : new URL(match[1], baseUrl).href;
    assets.push({ url, type: 'font' });
  }
  
  // Extract Rive animations
  const riveRegex = /["']([^"']+\.riv)["']/gi;
  while ((match = riveRegex.exec(html)) !== null) {
    const url = match[1].startsWith('http') ? match[1] : new URL(match[1], baseUrl).href;
    assets.push({ url, type: 'rive' });
  }
  
  return assets;
}

/**
 * Convert URL to local file path
 */
function urlToLocalPath(url, baseUrl) {
  try {
    const parsedUrl = new URL(url);
    const baseParsed = new URL(baseUrl);
    
    // External URLs - skip
    if (parsedUrl.hostname !== baseParsed.hostname) {
      return null;
    }
    
    let filePath = parsedUrl.pathname;
    
    // Remove leading slash
    if (filePath.startsWith('/')) {
      filePath = filePath.substring(1);
    }
    
    // Handle _payload.json with query string - use base filename
    if (filePath === '_payload.json' && parsedUrl.search) {
      filePath = '_payload.json';
    }
    
    // Handle query strings for _ipx images - encode properly
    if (filePath.startsWith('_ipx/') && parsedUrl.search) {
      // Convert query string to directory structure
      const queryPart = parsedUrl.search.substring(1).replace(/[=&]/g, '/');
      filePath = filePath + queryPart;
    }
    
    // Ensure we have a filename, not just a directory
    if (!filePath || filePath.endsWith('/')) {
      return null;
    }
    
    const fullPath = path.join(OUTPUT_DIR, filePath);
    
    // Check if path would be a directory (no extension and exists as dir)
    const ext = path.extname(fullPath);
    if (!ext && fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
      return null;
    }
    
    return fullPath;
  } catch (e) {
    return null;
  }
}

/**
 * Scrape a single page
 */
async function scrapePage(browser, pageConfig) {
  console.log(`\n=== Scraping ${pageConfig.path} ===`);
  
  const page = await browser.newPage();
  
  try {
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Enable request interception to track assets
    const requests = [];
    page.on('request', (request) => {
      requests.push({
        url: request.url(),
        resourceType: request.resourceType()
      });
    });
    
    // Navigate to page
    const fullUrl = BASE_URL + pageConfig.path;
    console.log(`Navigating to: ${fullUrl}`);
    
    await page.goto(fullUrl, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });
    
    // Wait for hero-introduction section to be present
    console.log('Waiting for hero-introduction section...');
    try {
      await page.waitForSelector('._hero-introduction', { timeout: 10000 });
      console.log('Hero-introduction section found');
    } catch (e) {
      console.log('Hero-introduction section not found (may not exist on this page)');
    }
    
    // Wait for GSAP/animations to initialize
    console.log('Waiting for animations to initialize...');
    await page.waitForTimeout(3000);
    
    // Scroll through page to trigger lazy-loading
    console.log('Scrolling through page...');
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
    
    // Wait for animations after scroll
    await page.waitForTimeout(2000);
    
    // Scroll back to top
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1000);
    
    // Get fully-rendered HTML
    console.log('Extracting HTML...');
    const html = await page.content();
    
    // Extract assets from HTML
    const assets = extractAssets(html, fullUrl);
    console.log(`Found ${assets.length} assets to download`);
    
    // Download assets
    for (const asset of assets) {
      const localPath = urlToLocalPath(asset.url, BASE_URL);
      if (localPath) {
        try {
          await downloadFile(asset.url, localPath);
        } catch (e) {
          console.error(`Failed to download ${asset.url}: ${e.message}`);
        }
      }
    }
    
    // Also download assets from network requests
    console.log(`Processing ${requests.length} network requests...`);
    let downloadedCount = 0;
    for (const req of requests) {
      if (req.url.startsWith(BASE_URL)) {
        const localPath = urlToLocalPath(req.url, BASE_URL);
        if (localPath && !downloadedAssets.has(req.url)) {
          try {
            await downloadFile(req.url, localPath);
            downloadedCount++;
          } catch (e) {
            // Silently fail for non-critical assets
          }
        }
      }
    }
    console.log(`Downloaded ${downloadedCount} additional assets from network requests`);
    
    // Convert absolute URLs to relative in HTML
    let processedHtml = html;
    const baseUrlObj = new URL(BASE_URL);
    
    // Convert all absolute URLs from jeton.com to relative
    // Match href="https://www.jeton.com/..." or href="/..."
    processedHtml = processedHtml.replace(
      new RegExp(`(href|src)=["']https://www\\.jeton\\.com([^"']+)["']`, 'g'),
      (match, attr, path) => {
        return `${attr}="${path.startsWith('/') ? path.substring(1) : path}"`;
      }
    );
    
    // Convert absolute paths starting with / (in href, src, srcset)
    processedHtml = processedHtml.replace(/(href|src|srcset)=["']([^"']*)["']/g, (match, attr, value) => {
      // Handle srcset with multiple URLs
      if (attr === 'srcset' && value.includes(',')) {
        return `${attr}="${value.split(',').map(url => {
          const parts = url.trim().split(/\s+/);
          const urlPart = parts[0];
          const sizePart = parts[1] || '';
          if (urlPart.startsWith('https://www.jeton.com/')) {
            const newUrl = urlPart.replace('https://www.jeton.com/', '');
            return `${newUrl} ${sizePart}`.trim();
          } else if (urlPart.startsWith('/') && !urlPart.startsWith('//')) {
            return `${urlPart.substring(1)} ${sizePart}`.trim();
          }
          return url.trim();
        }).join(', ')}"`;
      }
      
      // Skip external paths and special cases
      if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('//') || 
          value.startsWith('mailto:') || value.startsWith('tel:') || value.startsWith('data:')) {
        return match;
      }
      
      // Convert absolute paths
      if (value.startsWith('/') && !value.startsWith('//')) {
        return `${attr}="${value.substring(1)}"`;
      }
      
      return match;
    });
    
    // Also handle integrity attributes with absolute URLs
    processedHtml = processedHtml.replace(
      /integrity="[^"]*"[\s\n]*href=["']https:\/\/www\.jeton\.com([^"']+)["']/g,
      (match, path) => {
        return match.replace(`https://www.jeton.com${path}`, path.startsWith('/') ? path.substring(1) : path);
      }
    );
    
    // Fix hero-introduction h2 initial transform - should start at scale(0.3, 0.3) for animation
    processedHtml = processedHtml.replace(
      /(<h2[^>]*class="[^"]*-medium[^"]*whitespace-pre-line[^"]*"[^>]*style="[^"]*transform:\s*)scale\([^)]+\)/g,
      (match) => {
        // Only change if it's scale(2, 2) or other wrong values, keep scale(0.3, 0.3) or scale(1, 1)
        if (match.includes('scale(2, 2)') || match.includes('scale(2,2)')) {
          return match.replace(/scale\([^)]+\)/, 'scale(0.3, 0.3)');
        }
        return match;
      }
    );
    
    // Save HTML
    const outputPath = path.join(OUTPUT_DIR, pageConfig.file);
    fs.ensureDirSync(path.dirname(outputPath));
    fs.writeFileSync(outputPath, processedHtml, 'utf8');
    console.log(`Saved: ${outputPath}`);
    
    // Verify hero-introduction section has content
    if (html.includes('_hero-introduction')) {
      const heroContent = await page.evaluate(() => {
        const hero = document.querySelector('._hero-introduction');
        if (hero) {
          const h2 = hero.querySelector('h2');
          return {
            exists: true,
            hasH2: !!h2,
            h2Text: h2 ? h2.textContent.trim() : '',
            h2Visible: h2 ? window.getComputedStyle(h2).opacity !== '0' : false
          };
        }
        return { exists: false };
      });
      console.log('Hero-introduction status:', JSON.stringify(heroContent, null, 2));
    }
    
    return { success: true, assetsCount: assets.length };
    
  } catch (error) {
    console.error(`Error scraping ${pageConfig.path}:`, error);
    return { success: false, error: error.message };
  } finally {
    await page.close();
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Starting comprehensive scraper...');
  console.log(`Output directory: ${OUTPUT_DIR}`);
  
  // Ensure assets directory exists
  fs.ensureDirSync(ASSETS_DIR);
  
  // Launch browser
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    // Scrape each page
    const results = [];
    for (const pageConfig of PAGES_TO_SCRAPE) {
      const result = await scrapePage(browser, pageConfig);
      results.push({ page: pageConfig.path, ...result });
    }
    
    // Print summary
    console.log('\n=== Scraping Summary ===');
    results.forEach(r => {
      console.log(`${r.page}: ${r.success ? 'SUCCESS' : 'FAILED'} ${r.error || ''}`);
    });
    
    const successCount = results.filter(r => r.success).length;
    console.log(`\nCompleted: ${successCount}/${results.length} pages`);
    
  } finally {
    await browser.close();
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { scrapePage, downloadFile, extractAssets };

