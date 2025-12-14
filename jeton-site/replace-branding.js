/**
 * Replace Jeton Branding with CountWize & Co
 * 
 * Changes colors from orange/pink to green/black/white
 * Replaces "Jeton" with "CountWize & Co" where company name appears
 * PRESERVES all animations (no changes to keyframes or animation logic)
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const BASE_DIR = __dirname;

// Color mapping: Jeton colors → CountWize colors
const COLOR_MAP = {
  // Primary orange → Primary green
  '#f73b20': '#6b9071',
  '#F73B20': '#6b9071',
  '#f74522': '#6b9071',
  '#F74522': '#6b9071',
  
  // Light pink/orange → Light green variations
  '#fdcbc4': '#aec3b0',
  '#FDCBC4': '#aec3b0',
  '#fee9e6': '#d2ffda',
  '#FEE9E6': '#d2ffda',
  '#fdd6ce': '#a3dcad',
  '#FDD6CE': '#a3dcad',
  '#f5b1a3': '#aec3b0',
  '#F5B1A3': '#aec3b0',
};

// Additional hex color formats (with 8-char hex including alpha)
const HEX_ALPHA_MAP = {
  '#f73b200d': '#6b90710d', // 5% opacity
  '#f73b2080': '#6b907180', // 50% opacity
};

/**
 * Replace RGB colors
 */
function replaceRGBColors(content) {
  let result = content;
  
  // Replace rgb(247, 59, 32) → rgb(107, 144, 113)
  result = result.replace(/rgb\(\s*247\s*,\s*59\s*,\s*32\s*\)/gi, 'rgb(107, 144, 113)');
  
  // Replace rgba(247, 59, 32, X) → rgba(107, 144, 113, X) - preserve opacity
  result = result.replace(/rgba\(\s*247\s*,\s*59\s*,\s*32\s*,\s*([^)]+)\)/gi, (match, alpha) => {
    return `rgba(107, 144, 113, ${alpha.trim()})`;
  });
  
  return result;
}

/**
 * Replace hex colors
 */
function replaceHexColors(content) {
  let result = content;
  
  // Replace standard hex colors
  for (const [oldColor, newColor] of Object.entries(COLOR_MAP)) {
    // Create case-insensitive regex
    const regex = new RegExp(oldColor.replace('#', '#'), 'gi');
    result = result.replace(regex, newColor);
  }
  
  // Replace hex colors with alpha
  for (const [oldColor, newColor] of Object.entries(HEX_ALPHA_MAP)) {
    const regex = new RegExp(oldColor, 'gi');
    result = result.replace(regex, newColor);
  }
  
  return result;
}

/**
 * Replace company name in appropriate contexts
 * Only replaces standalone "Jeton" (not in class names or URLs)
 */
function replaceCompanyName(content, isJSON = false) {
  let result = content;
  
  // Replace in page titles
  result = result.replace(/\|\s*Jeton\b/gi, '| CountWize & Co');
  result = result.replace(/\bJeton\s*\|/gi, 'CountWize & Co |');
  
  // Replace in meta tags
  result = result.replace(/content="Jeton"/gi, 'content="CountWize & Co"');
  result = result.replace(/content='Jeton'/gi, "content='CountWize & Co'");
  
  // Replace standalone "Jeton" in JSON strings
  if (isJSON) {
    result = result.replace(/"Jeton"/g, '"CountWize & Co"');
  }
  
  // Replace URLs
  result = result.replace(/jeton\.com/gi, 'countwize.app');
  result = result.replace(/jetonhelp\.zendesk\.com/gi, 'countwizehelp.zendesk.com');
  result = result.replace(/jetonbucket/gi, 'countwizebucket');
  
  return result;
}

/**
 * Process a single file
 */
function processFile(filePath) {
  try {
    // Skip certain files
    const skipPatterns = [
      'node_modules',
      'replace-branding.js',
      'visual-audit-report.json',
      'walkthrough-test-report.json',
      'animation-test-report.json',
      'audit-report.json',
      'comparison-report.json',
    ];
    
    if (skipPatterns.some(pattern => filePath.includes(pattern))) {
      return { changed: false, skipped: true };
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    const ext = path.extname(filePath).toLowerCase();
    const isJSON = ext === '.json';
    const isCSS = ext === '.css';
    const isHTML = ext === '.html';
    
    // Replace colors
    content = replaceHexColors(content);
    content = replaceRGBColors(content);
    
    // Replace company name (only in HTML and JSON, not in CSS)
    if (isHTML || isJSON) {
      content = replaceCompanyName(content, isJSON);
    }
    
    // Only write if changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      return { changed: true, skipped: false };
    }
    
    return { changed: false, skipped: false };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return { changed: false, skipped: false, error: error.message };
  }
}

/**
 * Find all files to process
 */
function findFiles() {
  const files = [];
  
  // HTML files
  try {
    const htmlFiles = execSync(
      `find "${BASE_DIR}" -type f -name "*.html" -not -path "*/node_modules/*"`,
      { encoding: 'utf8' }
    ).trim().split('\n').filter(f => f);
    files.push(...htmlFiles);
  } catch (e) {}
  
  // CSS files
  try {
    const cssFiles = execSync(
      `find "${BASE_DIR}" -type f -name "*.css" -not -path "*/node_modules/*"`,
      { encoding: 'utf8' }
    ).trim().split('\n').filter(f => f);
    files.push(...cssFiles);
  } catch (e) {}
  
  // JSON payload files
  try {
    const jsonFiles = execSync(
      `find "${BASE_DIR}" -type f -name "*.json" -not -path "*/node_modules/*" -not -name "package*.json"`,
      { encoding: 'utf8' }
    ).trim().split('\n').filter(f => f);
    files.push(...jsonFiles);
  } catch (e) {}
  
  return [...new Set(files)].filter(f => f && fs.existsSync(f));
}

/**
 * Main function
 */
function main() {
  console.log('='.repeat(70));
  console.log('REPLACING JETON BRANDING WITH COUNTWIZE & CO');
  console.log('='.repeat(70));
  
  console.log('\nColor Mappings:');
  console.log('  #f73b20 -> #6b9071 (Primary orange -> Primary green)');
  console.log('  #f74522 -> #6b9071 (Secondary orange -> Primary green)');
  console.log('  #fdcbc4 -> #aec3b0 (Light pink -> Light green)');
  console.log('  #fee9e6 -> #d2ffda (Very light pink -> Lightest green)');
  console.log('  #fdd6ce -> #a3dcad (Light orange -> Lighter green)');
  console.log('  #f5b1a3 -> #aec3b0 (Light pink -> Light green)');
  console.log('  rgb(247, 59, 32) -> rgb(107, 144, 113)');
  console.log('  rgba(247, 59, 32, X) -> rgba(107, 144, 113, X)\n');
  
  console.log('Company Name:');
  console.log('  "Jeton" -> "CountWize & Co"');
  console.log('  jeton.com -> countwize.app\n');
  
  console.log('NOTE: Animations will NOT be modified\n');
  
  const files = findFiles();
  console.log(`Found ${files.length} files to process\n`);
  
  let processed = 0;
  let changed = 0;
  let skipped = 0;
  const changedFiles = [];
  
  for (const file of files) {
    const relativePath = path.relative(BASE_DIR, file);
    const result = processFile(file);
    
    if (result.skipped) {
      skipped++;
    } else if (result.changed) {
      changed++;
      changedFiles.push(relativePath);
      console.log(`  [UPDATED] ${relativePath}`);
    }
    
    processed++;
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('COMPLETE!');
  console.log('='.repeat(70));
  console.log(`  Total files found: ${files.length}`);
  console.log(`  Files processed: ${processed}`);
  console.log(`  Files changed: ${changed}`);
  console.log(`  Files skipped: ${skipped}`);
  
  if (changedFiles.length > 0) {
    console.log('\nChanged files:');
    changedFiles.forEach(f => console.log(`  - ${f}`));
  }
  
  return { processed, changed, skipped, changedFiles };
}

if (require.main === module) {
  main();
}

module.exports = { replaceHexColors, replaceRGBColors, replaceCompanyName, processFile, main };



