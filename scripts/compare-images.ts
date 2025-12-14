import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

// Get the screenshots directory
const screenshotsDir = path.join(process.cwd(), 'screenshots');
const diffsDir = path.join(process.cwd(), 'diffs');

// Ensure diffs directory exists
if (!fs.existsSync(diffsDir)) {
  fs.mkdirSync(diffsDir, { recursive: true });
}

// Get command line arguments or find the two most recent screenshots
let img1Path: string;
let img2Path: string;

if (process.argv.length >= 4) {
  // Use provided arguments
  img1Path = process.argv[2];
  img2Path = process.argv[3];
} else {
  // Find the two most recent PNG files in screenshots directory
  const files = fs.readdirSync(screenshotsDir)
    .filter(f => f.endsWith('.png'))
    .map(f => ({
      name: f,
      path: path.join(screenshotsDir, f),
      mtime: fs.statSync(path.join(screenshotsDir, f)).mtime.getTime()
    }))
    .sort((a, b) => b.mtime - a.mtime);

  if (files.length < 2) {
    console.error('Need at least 2 PNG screenshots to compare');
    process.exit(1);
  }

  img1Path = files[1].path; // Second most recent (baseline/target)
  img2Path = files[0].path; // Most recent (current state)
  
  console.log(`Comparing:`);
  console.log(`  Baseline: ${files[1].name}`);
  console.log(`  Current:  ${files[0].name}`);
}

// Read the images
const img1 = PNG.sync.read(fs.readFileSync(img1Path));
const img2 = PNG.sync.read(fs.readFileSync(img2Path));

// Check dimensions match
if (img1.width !== img2.width || img1.height !== img2.height) {
  console.error(`Image dimensions don't match!`);
  console.error(`  Image 1: ${img1.width}x${img1.height}`);
  console.error(`  Image 2: ${img2.width}x${img2.height}`);
  
  // Resize to match the larger dimensions
  const width = Math.max(img1.width, img2.width);
  const height = Math.max(img1.height, img2.height);
  
  console.log(`  Using dimensions: ${width}x${height}`);
  
  // Create new canvases with matching dimensions
  const resized1 = new PNG({ width, height });
  const resized2 = new PNG({ width, height });
  
  // Copy image data (simple copy, not actual resize)
  PNG.bitblt(img1, resized1, 0, 0, Math.min(img1.width, width), Math.min(img1.height, height), 0, 0);
  PNG.bitblt(img2, resized2, 0, 0, Math.min(img2.width, width), Math.min(img2.height, height), 0, 0);
  
  // Use resized images
  img1.data = resized1.data;
  img1.width = width;
  img1.height = height;
  img2.data = resized2.data;
  img2.width = width;
  img2.height = height;
}

const { width, height } = img1;

// Create diff image
const diff = new PNG({ width, height });

// Run pixelmatch
const numDiffPixels = pixelmatch(
  img1.data,
  img2.data,
  diff.data,
  width,
  height,
  {
    threshold: 0.1,
    includeAA: true,
    alpha: 0.1
  }
);

// Calculate diff percentage
const totalPixels = width * height;
const diffPercentage = ((numDiffPixels / totalPixels) * 100).toFixed(2);

// Generate timestamp for output filename
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputPath = path.join(diffsDir, `diff-${timestamp}.png`);

// Write the diff image
fs.writeFileSync(outputPath, PNG.sync.write(diff));

console.log(`\nResults:`);
console.log(`  Different pixels: ${numDiffPixels.toLocaleString()} (${diffPercentage}%)`);
console.log(`  Total pixels: ${totalPixels.toLocaleString()}`);
console.log(`  Diff saved to: ${outputPath}`);

// Exit with code based on whether there are differences
if (numDiffPixels === 0) {
  console.log(`\n✅ Images are identical!`);
  process.exit(0);
} else {
  console.log(`\n⚠️  Images have differences - check the diff image`);
  process.exit(0); // Exit 0 so the workflow continues
}
