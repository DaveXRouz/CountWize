/**
 * Download Rive Animation Files from CDN
 * Downloads all Rive files referenced in the site to local rive/ directory
 */

const https = require('https');
const http = require('http');
const fs = require('fs-extra');
const path = require('path');
const { URL } = require('url');

const BASE_CDN_URL = 'https://cdn.sanity.io/files/q3ih7d1b/production';
const OUTPUT_DIR = path.join(__dirname, 'rive');
const BASE_URL = 'https://www.jeton.com';

// Rive files identified from console errors and HTML
const RIVE_FILES = [
  '8d69d40e5b4bce75fcc798d223029db8a1ccdeab.riv',
  '01ab41d2c3f10a4db55f02c855b37106ae2d2568.riv',
  '6442a9110636ba0da2e6c0c731d92457d7e928cc.riv',
  '23a3c11ba226d4bb7e916918723d814288b77265.riv',
  '95cea0426464659130966516e85464603be1e091.riv'
];

/**
 * Download a file from URL
 */
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    // Check if file already exists
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      if (stats.isFile() && stats.size > 0) {
        console.log(`Already exists: ${path.basename(outputPath)}`);
        resolve();
        return;
      }
    }

    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    fs.ensureDirSync(dir);

    const file = fs.createWriteStream(outputPath);
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    };
    
    client.get(url, options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
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

      const totalSize = parseInt(response.headers['content-length'] || '0', 10);
      let downloadedSize = 0;

      response.on('data', (chunk) => {
        downloadedSize += chunk.length;
        if (totalSize > 0) {
          const percent = ((downloadedSize / totalSize) * 100).toFixed(1);
          process.stdout.write(`\rDownloading ${path.basename(outputPath)}: ${percent}%`);
        }
      });

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(outputPath);
        console.log(`\n✓ Downloaded: ${path.basename(outputPath)} (${(stats.size / 1024).toFixed(2)} KB)`);
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
 * Extract Rive file URLs from HTML
 */
function extractRiveUrls(html) {
  const urls = new Set();
  
  // Pattern: cdn.sanity.io/files/.../hash.riv
  const regex = /https?:\/\/cdn\.sanity\.io\/files\/[^"'\s]+\.riv/gi;
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    urls.add(match[0]);
  }
  
  return Array.from(urls);
}

/**
 * Extract Rive file hashes from JavaScript
 */
async function extractRiveFromJS() {
  const jsFiles = [];
  
  function findJSFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory() && !file.startsWith('.')) {
        findJSFiles(filePath);
      } else if (file.endsWith('.js')) {
        jsFiles.push(filePath);
      }
    }
  }
  
  findJSFiles(path.join(__dirname, '_nuxt'));
  
  const riveUrls = new Set();
  
  for (const jsFile of jsFiles) {
    try {
      const content = fs.readFileSync(jsFile, 'utf8');
      const matches = content.match(/cdn\.sanity\.io\/files\/[^"'\s]+\.riv/gi);
      if (matches) {
        matches.forEach(m => riveUrls.add('https://' + m));
      }
    } catch (e) {
      // Skip files that can't be read
    }
  }
  
  return Array.from(riveUrls);
}

/**
 * Main function
 */
async function main() {
  console.log('Downloading Rive animation files...\n');
  
  // Ensure output directory exists
  fs.ensureDirSync(OUTPUT_DIR);
  
  // Get Rive URLs from HTML
  console.log('Extracting Rive URLs from HTML...');
  const htmlPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const htmlUrls = extractRiveUrls(html);
    console.log(`Found ${htmlUrls.length} Rive URLs in HTML`);
  }
  
  // Get Rive URLs from JavaScript
  console.log('Extracting Rive URLs from JavaScript...');
  const jsUrls = await extractRiveFromJS();
  console.log(`Found ${jsUrls.length} Rive URLs in JavaScript`);
  
  // Combine all URLs
  const allUrls = new Set();
  RIVE_FILES.forEach(file => {
    allUrls.add(`${BASE_CDN_URL}/${file}`);
  });
  jsUrls.forEach(url => allUrls.add(url));
  
  console.log(`\nTotal unique Rive files to download: ${allUrls.size}\n`);
  
  // Download each file
  const results = [];
  for (const url of allUrls) {
    try {
      const fileName = path.basename(url);
      const outputPath = path.join(OUTPUT_DIR, fileName);
      
      await downloadFile(url, outputPath);
      results.push({ url, fileName, status: 'success' });
    } catch (error) {
      console.error(`\n✗ Failed to download ${url}: ${error.message}`);
      results.push({ url, fileName: path.basename(url), status: 'error', error: error.message });
    }
  }
  
  // Summary
  console.log('\n=== Download Summary ===');
  const successCount = results.filter(r => r.status === 'success').length;
  const errorCount = results.filter(r => r.status === 'error').length;
  
  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  
  if (errorCount > 0) {
    console.log('\nFailed downloads:');
    results.filter(r => r.status === 'error').forEach(r => {
      console.log(`  - ${r.fileName}: ${r.error}`);
    });
  }
  
  // List downloaded files
  console.log('\n=== Downloaded Files ===');
  const files = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.riv'));
  files.forEach(file => {
    const stats = fs.statSync(path.join(OUTPUT_DIR, file));
    console.log(`  ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  });
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { downloadFile, extractRiveUrls };
