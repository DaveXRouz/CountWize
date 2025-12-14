import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const SCREENSHOTS_DIR = path.join(process.cwd(), 'screenshots');
const DIFFS_DIR = path.join(process.cwd(), 'diffs');

const BREAKPOINTS = ['desktop', 'laptop', 'mobile'];

interface DiffResult {
  page: string;
  breakpoint: string;
  beforePath: string;
  afterPath: string;
  diffPath: string;
  diffPixels: number;
  totalPixels: number;
  diffPercentage: string;
}

async function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function generateDiff(
  beforePath: string,
  afterPath: string,
  outputPath: string
): Promise<{ diffPixels: number; totalPixels: number }> {
  const img1 = PNG.sync.read(fs.readFileSync(beforePath));
  const img2 = PNG.sync.read(fs.readFileSync(afterPath));

  // Use max dimensions
  const width = Math.max(img1.width, img2.width);
  const height = Math.max(img1.height, img2.height);

  // Create canvases with same size
  const canvas1 = new PNG({ width, height });
  const canvas2 = new PNG({ width, height });
  
  // Copy image data
  PNG.bitblt(img1, canvas1, 0, 0, Math.min(img1.width, width), Math.min(img1.height, height), 0, 0);
  PNG.bitblt(img2, canvas2, 0, 0, Math.min(img2.width, width), Math.min(img2.height, height), 0, 0);

  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    canvas1.data,
    canvas2.data,
    diff.data,
    width,
    height,
    { threshold: 0.1, includeAA: true }
  );

  fs.writeFileSync(outputPath, PNG.sync.write(diff));

  return { diffPixels: numDiffPixels, totalPixels: width * height };
}

async function main() {
  console.log('Generating visual diffs...\n');

  const results: DiffResult[] = [];

  for (const bp of BREAKPOINTS) {
    const beforeDir = path.join(SCREENSHOTS_DIR, 'before', bp);
    const afterDir = path.join(SCREENSHOTS_DIR, 'after', bp);
    const diffDir = path.join(DIFFS_DIR, bp);

    await ensureDir(diffDir);

    if (!fs.existsSync(beforeDir) || !fs.existsSync(afterDir)) {
      console.log(`Skipping ${bp}: missing before or after directory`);
      continue;
    }

    const beforeFiles = fs.readdirSync(beforeDir).filter(f => f.endsWith('.png'));

    for (const file of beforeFiles) {
      const beforePath = path.join(beforeDir, file);
      const afterPath = path.join(afterDir, file);
      const diffPath = path.join(diffDir, `diff-${file}`);

      if (!fs.existsSync(afterPath)) {
        console.log(`⚠️ Missing after screenshot: ${file} @ ${bp}`);
        continue;
      }

      try {
        const { diffPixels, totalPixels } = await generateDiff(beforePath, afterPath, diffPath);
        const diffPercentage = ((diffPixels / totalPixels) * 100).toFixed(2);

        results.push({
          page: file.replace('.png', ''),
          breakpoint: bp,
          beforePath,
          afterPath,
          diffPath,
          diffPixels,
          totalPixels,
          diffPercentage,
        });

        const status = diffPixels === 0 ? '✓ No change' : `⚡ ${diffPercentage}% changed`;
        console.log(`${file} @ ${bp}: ${status}`);
      } catch (error) {
        console.error(`❌ Error processing ${file} @ ${bp}:`, error);
      }
    }
  }

  // Generate summary
  console.log('\n========================================');
  console.log('DIFF SUMMARY');
  console.log('========================================\n');

  const changedPages = results.filter(r => r.diffPixels > 0);
  const unchangedPages = results.filter(r => r.diffPixels === 0);

  console.log(`Total comparisons: ${results.length}`);
  console.log(`Pages with changes: ${changedPages.length}`);
  console.log(`Pages unchanged: ${unchangedPages.length}`);

  if (changedPages.length > 0) {
    console.log('\nTop changes:');
    changedPages
      .sort((a, b) => parseFloat(b.diffPercentage) - parseFloat(a.diffPercentage))
      .slice(0, 10)
      .forEach(r => {
        console.log(`  ${r.page} @ ${r.breakpoint}: ${r.diffPercentage}%`);
      });
  }

  // Save results to JSON
  const reportPath = path.join(DIFFS_DIR, 'diff-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nReport saved to: ${reportPath}`);
}

main();
