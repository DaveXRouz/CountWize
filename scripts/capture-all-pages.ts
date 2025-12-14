import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

// Configuration
const BASE_URL = 'http://localhost:8080';
const SCREENSHOTS_DIR = path.join(process.cwd(), 'screenshots');

// All pages to capture
const PAGES = [
  // Batch 1: Critical pages
  'index.html',
  'about-us.html',
  'contact.html',
  'contact-us.html',
  'recovery.html',
  
  // Batch 2: High priority
  'crypto-tax.html',
  'crypto-recovery-guide.html',
  'education.html',
  'faq.html',
  'news.html',
  'team.html',
  'blog.html',
  
  // Batch 3: Article pages
  'article-4.html',
  'article-5.html',
  'forex-scams.html',
  'how-does-a-crypto-recovery-phrase-work.html',
  'how-do-you-check-if-a-website-is-legitimate.html',
  'how-to-avoid-losing-your-crypto-real-mistakes-real-fixes-and-smart-protection-tips.html',
  'crypto-insights.html',
  'crypto-education.html',
  
  // Batch 4: Templates and utility pages
  'detail_post.html',
  'detail_service.html',
  'detail_project.html',
  'detail_member.html',
  'detail_blogcategory.html',
  'detail_education-videos.html',
  'faq-crypto-recovery.html',
  'recovery-questionnaire.html',
  'cookie-policy.html',
  'privacy-policy.html',
  'legal.html',
  '401.html',
  '404.html',
];

// Screen sizes to capture
const BREAKPOINTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'laptop', width: 1024, height: 768 },
  { name: 'mobile', width: 375, height: 812 },
];

async function ensureDirectories() {
  const dirs = [
    SCREENSHOTS_DIR,
    path.join(SCREENSHOTS_DIR, 'before'),
    path.join(SCREENSHOTS_DIR, 'after'),
    path.join(SCREENSHOTS_DIR, 'before', 'desktop'),
    path.join(SCREENSHOTS_DIR, 'before', 'laptop'),
    path.join(SCREENSHOTS_DIR, 'before', 'mobile'),
    path.join(SCREENSHOTS_DIR, 'after', 'desktop'),
    path.join(SCREENSHOTS_DIR, 'after', 'laptop'),
    path.join(SCREENSHOTS_DIR, 'after', 'mobile'),
  ];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

async function captureScreenshot(
  page: Page,
  pageName: string,
  breakpoint: typeof BREAKPOINTS[0],
  phase: 'before' | 'after'
): Promise<void> {
  const url = `${BASE_URL}/${pageName}`;
  const filename = pageName.replace('.html', '') + '.png';
  const outputPath = path.join(SCREENSHOTS_DIR, phase, breakpoint.name, filename);
  
  try {
    // Set viewport size
    await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
    
    // Navigate to page
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });
    
    // Wait a bit for any animations to settle
    await page.waitForTimeout(500);
    
    // Take full page screenshot
    await page.screenshot({
      path: outputPath,
      fullPage: true,
    });
    
    console.log(`✓ ${pageName} @ ${breakpoint.name}`);
  } catch (error) {
    console.error(`✗ ${pageName} @ ${breakpoint.name}: ${error}`);
  }
}

async function captureAllPages(phase: 'before' | 'after' = 'before') {
  console.log(`\n========================================`);
  console.log(`Starting ${phase.toUpperCase()} screenshot capture...`);
  console.log(`========================================\n`);
  
  await ensureDirectories();
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  let successCount = 0;
  let failCount = 0;
  const totalCaptures = PAGES.length * BREAKPOINTS.length;
  
  for (const pageName of PAGES) {
    for (const breakpoint of BREAKPOINTS) {
      try {
        await captureScreenshot(page, pageName, breakpoint, phase);
        successCount++;
      } catch {
        failCount++;
      }
    }
  }
  
  await browser.close();
  
  console.log(`\n========================================`);
  console.log(`Capture complete!`);
  console.log(`Success: ${successCount}/${totalCaptures}`);
  console.log(`Failed: ${failCount}/${totalCaptures}`);
  console.log(`Screenshots saved to: ${SCREENSHOTS_DIR}/${phase}/`);
  console.log(`========================================\n`);
}

// Get phase from command line argument
const phase = (process.argv[2] as 'before' | 'after') || 'before';

if (phase !== 'before' && phase !== 'after') {
  console.error('Usage: npx tsx scripts/capture-all-pages.ts [before|after]');
  process.exit(1);
}

captureAllPages(phase);
