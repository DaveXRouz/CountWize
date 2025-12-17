/**
 * Fix absolute paths in jeton-site HTML files to use relative paths
 * This allows the site to work when served from a subdirectory
 */

const fs = require('fs');
const path = require('path');

const JETON_SITE_DIR = __dirname;

/**
 * Calculate relative path from a file to the jeton-site root
 */
function getRelativePathToRoot(filePath) {
  const relativePath = path.relative(JETON_SITE_DIR, filePath);
  const depth = relativePath.split(path.sep).length - 1;
  return depth > 0 ? '../'.repeat(depth).slice(0, -1) : '.';
}

/**
 * Convert absolute paths to relative paths in HTML content
 */
function fixPathsInContent(content, filePath) {
  const relativeToRoot = getRelativePathToRoot(filePath);
  const basePath = relativeToRoot === '.' ? '' : relativeToRoot + '/';
  
  // Replace absolute paths that start with / (but not // for external URLs)
  // Pattern: href="/path" or src="/path" or href='/path' or src='/path'
  let result = content;
  
  // Fix paths in href and src attributes
  // Match: href="/..." or src="/..." (but not href="//..." for external URLs)
  result = result.replace(/(href|src)=["']\/([^"']+)["']/g, (match, attr, path) => {
    // Skip if it's an external URL (starts with //)
    if (path.startsWith('/')) {
      return match;
    }
    // Skip if it's a full URL (http://, https://, etc.)
    if (path.match(/^(https?:|mailto:|tel:|#)/)) {
      return match;
    }
    return `${attr}="${basePath}${path}"`;
  });
  
  // Fix paths in link preload/prefetch
  result = result.replace(/(href|as|crossorigin)=["']\/([^"']+)["']/g, (match, attr, path) => {
    if (path.startsWith('/') || path.match(/^(https?:|mailto:|tel:|#)/)) {
      return match;
    }
    return `${attr}="${basePath}${path}"`;
  });
  
  // Fix _payload.json paths (they might be in query strings or other contexts)
  result = result.replace(/href=["']\/_payload\.json([^"']*)["']/g, (match, query) => {
    return `href="${basePath}_payload.json${query}"`;
  });
  
  // Fix paths in CSS url() functions (in style tags and inline styles)
  // Match: url(/_nuxt/...) or url('/_nuxt/...') or url("/_nuxt/...")
  result = result.replace(/url\(["']?\/([^"')]+)["']?\)/g, (match, path) => {
    // Skip if it's an external URL (starts with //)
    if (path.startsWith('/')) {
      return match;
    }
    // Skip if it's a full URL (http://, https://, data:, etc.)
    if (path.match(/^(https?:|data:|mailto:|tel:)/)) {
      return match;
    }
    // Extract quotes if present
    const hasQuotes = match.includes("'") || match.includes('"');
    const quote = hasQuotes ? (match.includes("'") ? "'" : '"') : '';
    return `url(${quote}${basePath}${path}${quote})`;
  });
  
  return result;
}

/**
 * Process a single HTML file
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = fixPathsInContent(content, filePath);
    
    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      return { changed: true };
    }
    
    return { changed: false };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return { changed: false, error: error.message };
  }
}

/**
 * Find all HTML files in jeton-site
 */
function findHTMLFiles() {
  const files = [];
  
  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and other build directories
        if (!['node_modules', '.git'].includes(entry.name)) {
          walkDir(fullPath);
        }
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  }
  
  walkDir(JETON_SITE_DIR);
  return files;
}

/**
 * Main function
 */
function main() {
  console.log('='.repeat(70));
  console.log('FIXING ABSOLUTE PATHS IN JETON-SITE HTML FILES');
  console.log('='.repeat(70));
  console.log('Converting absolute paths (/) to relative paths\n');
  
  const files = findHTMLFiles();
  console.log(`Found ${files.length} HTML files to process\n`);
  
  let processed = 0;
  let changed = 0;
  const changedFiles = [];
  
  for (const file of files) {
    const relativePath = path.relative(JETON_SITE_DIR, file);
    const result = processFile(file);
    
    if (result.changed) {
      changed++;
      changedFiles.push(relativePath);
      console.log(`  [FIXED] ${relativePath}`);
    }
    
    processed++;
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('COMPLETE!');
  console.log('='.repeat(70));
  console.log(`  Total files found: ${files.length}`);
  console.log(`  Files processed: ${processed}`);
  console.log(`  Files changed: ${changed}`);
  
  if (changedFiles.length > 0) {
    console.log('\nFixed files:');
    changedFiles.forEach(f => console.log(`  - ${f}`));
  }
  
  return { processed, changed, changedFiles };
}

if (require.main === module) {
  main();
}

module.exports = { fixPathsInContent, processFile, findHTMLFiles, main };
