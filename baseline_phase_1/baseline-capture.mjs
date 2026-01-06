// baseline-capture.mjs
// CountWize Phase 1B: Browser Evidence Capture
// - Captures viewport screenshots (above fold + footer)
// - Captures console logs + page errors
// - Captures HAR (home/contact/questionnaire)
// - Runs axe a11y scans (home/contact/questionnaire)
// - Tests forms (success + failure) WITHOUT sending real leads (mocks Telegram endpoint)
//
// Run:
//   node baseline-capture.mjs --base https://countwize.com --out baseline_phase_1
//
// Notes:
// - This is "no code changes" evidence collection.
// - If a page is blocked (403/404), script logs it and continues.

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

function arg(name, fallback = null) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return fallback;
  const val = process.argv[idx + 1];
  return val && !val.startsWith("--") ? val : fallback;
}

const BASE = (arg("--base", "https://countwize.com") || "").replace(/\/+$/, "");
const OUT = arg("--out", "baseline_phase_1");

const DIRS = {
  root: OUT,
  screenshots: path.join(OUT, "screenshots"),
  console: path.join(OUT, "console-logs"),
  network: path.join(OUT, "network-logs"),
  accessibility: path.join(OUT, "accessibility"),
  forms: path.join(OUT, "forms-evidence"),
  formsShots: path.join(OUT, "forms-evidence", "submission_success_screenshots"),
};

const PAGES = [
  { key: "home", url: `${BASE}/` },
  { key: "recovery", url: `${BASE}/recovery` },
  { key: "contact-us", url: `${BASE}/contact-us` },
  { key: "questionnaire", url: `${BASE}/recovery-questionnaire` },
  { key: "news", url: `${BASE}/news` },
  // Optional (may 404 on live, still worth attempting):
  { key: "401", url: `${BASE}/401` },
  { key: "detail_service", url: `${BASE}/detail_service` },
  { key: "detail_service_html", url: `${BASE}/detail_service.html` },
];

const VIEWPORTS = [
  { id: "desktop", width: 1440, height: 900 },
  { id: "tablet", width: 768, height: 1024 },
  { id: "mobile390", width: 390, height: 844 },
  { id: "mobile360", width: 360, height: 800 },
];

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeFile(p, content) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, content);
}

function nowISO() {
  return new Date().toISOString();
}

async function safeGoto(page, url) {
  try {
    const resp = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    // Wait a beat for Webflow + embeds
    await page.waitForTimeout(1500);
    return resp;
  } catch (e) {
    return null;
  }
}

async function screenshotAboveFold(page, outPath) {
  await page.screenshot({ path: outPath, fullPage: false });
}

async function screenshotFooter(page, outPath) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  await page.screenshot({ path: outPath, fullPage: false });
}

async function captureScreenshots(browser) {
  const log = [];
  for (const p of PAGES.slice(0, 5)) {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await ctx.newPage();

      const resp = await safeGoto(page, p.url);
      const status = resp ? resp.status() : "NO_RESPONSE";
      log.push(`${p.key} @ ${vp.id} -> ${p.url} status=${status}`);

      if (resp && status < 400) {
        const above = path.join(DIRS.screenshots, `${p.key}_${vp.id}_abovefold.png`);
        await screenshotAboveFold(page, above);

        // Footer only for mobile390 to match Phase 1 requirements
        if (vp.id === "mobile390") {
          const foot = path.join(DIRS.screenshots, `${p.key}_${vp.id}_footer.png`);
          await screenshotFooter(page, foot);
        }
      }

      await ctx.close();
    }
  }
  writeFile(path.join(DIRS.root, "PHASE_1B_screenshots_log.txt"), log.join("\n"));
}

async function captureConsoleLogs(browser) {
  const targets = ["home", "contact-us", "questionnaire", "news"];
  for (const key of targets) {
    const p = PAGES.find(x => x.key === key);
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();

    const lines = [];
    page.on("console", (msg) => {
      lines.push(`[console:${msg.type()}] ${msg.text()}`);
    });
    page.on("pageerror", (err) => {
      lines.push(`[pageerror] ${err?.message || String(err)}`);
    });
    page.on("requestfailed", (req) => {
      lines.push(`[requestfailed] ${req.url()} :: ${req.failure()?.errorText || "unknown"}`);
    });

    const resp = await safeGoto(page, p.url);
    lines.push(`NAVIGATED: ${p.url}`);
    lines.push(`STATUS: ${resp ? resp.status() : "NO_RESPONSE"}`);
    lines.push(`FINAL_URL: ${page.url()}`);
    await page.waitForTimeout(1200);

    writeFile(path.join(DIRS.console, `${key.replace("-", "_")}_console.txt`), lines.join("\n"));
    await ctx.close();
  }
}

async function captureHAR(browser) {
  const targets = ["home", "contact-us", "questionnaire"];
  for (const key of targets) {
    const p = PAGES.find(x => x.key === key);
    const harPath = path.join(DIRS.network, `${key.replace("-", "_")}_network.har`);

    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      recordHar: { path: harPath, content: "embed" },
    });
    const page = await ctx.newPage();

    await safeGoto(page, p.url);
    await page.waitForTimeout(1500);

    await ctx.close(); // flush HAR
  }
}

async function runAxe(browser) {
  const targets = ["home", "contact-us", "questionnaire"];
  for (const key of targets) {
    const p = PAGES.find(x => x.key === key);
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();

    const resp = await safeGoto(page, p.url);
    if (!resp || resp.status() >= 400) {
      writeFile(path.join(DIRS.accessibility, `axe_${key.replace("-", "_")}.json`), JSON.stringify({ error: "page_not_accessible" }, null, 2));
      await ctx.close();
      continue;
    }

    // Wait for Webflow interactions
    await page.waitForTimeout(1500);

    const results = await new AxeBuilder({ page }).analyze();
    writeFile(path.join(DIRS.accessibility, `axe_${key.replace("-", "_")}.json`), JSON.stringify(results, null, 2));
    await ctx.close();
  }
}

async function withTelegramMock(page) {
  // Prevent real lead submissions: mock Telegram/Vercel endpoint
  let telegramCount = 0;

  await page.route("**/*", async (route) => {
    const url = route.request().url();
    if (url.includes("telegram-vercel-seven.vercel.app")) {
      telegramCount += 1;
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, mocked: true }),
      });
    }
    return route.continue();
  });

  return () => telegramCount;
}

async function testHomeForm(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const getTelegramCount = await withTelegramMock(page);

  await safeGoto(page, `${BASE}/`);

  // Wait for page to fully load and scroll to form
  await page.waitForTimeout(3000);

  const form = page.locator("form#email-form, form.hero-form").first();
  let failCount = 0;
  let successCount = 0;
  let notes = [`HOME FORM TEST @ ${nowISO()}`];

  try {
    // Scroll form into view
    await form.scrollIntoViewIfNeeded({ timeout: 10000 });
    await page.waitForTimeout(1000);

    // Try to fill form fields with fallbacks
    const fillField = async (selectors, value) => {
      for (const sel of selectors) {
        try {
          const el = form.locator(sel).first();
          if (await el.count() > 0) {
            await el.fill(value, { timeout: 5000 });
            return true;
          }
        } catch {}
      }
      return false;
    };

    // Fill fields with multiple selector attempts
    await fillField(['#First-Name', 'input[name="First-Name"]', 'input[placeholder*="Name"]'], "Test");
    await fillField(['#Last-Name', 'input[name="Last-Name"]', 'input[placeholder*="Last"]'], "User");
    await fillField(['#Email', 'input[type="email"]', 'input[name="Email"]'], "test@example.com");
    await fillField(['#Phone', 'input[type="tel"]', 'input[name="Phone"]'], "123"); // invalid
    await fillField(['#Investment', 'input[name="Investment"]'], "1000");
    await fillField(['#Your-Problem-2', 'input[name="Your-Problem"]'], "Baseline test");

    // Try to submit
    const submitBtn = form.locator('button[type="submit"], input[type="submit"], .submit-button-2').first();
    if (await submitBtn.count() > 0) {
      await submitBtn.click({ timeout: 5000 });
    }
    await page.waitForTimeout(1500);

    failCount = getTelegramCount();
    notes.push(`Invalid phone attempt: telegramCount=${failCount} (expect 0 if validation blocks)`);

    await page.screenshot({ path: path.join(DIRS.formsShots, "home_form_invalid_phone_blocked.png"), fullPage: false });

    // SUCCESS: valid phone
    await fillField(['#Phone', 'input[type="tel"]', 'input[name="Phone"]'], "+447911123456");
    if (await submitBtn.count() > 0) {
      await submitBtn.click({ timeout: 5000 });
    }
    await page.waitForTimeout(2000);

    successCount = getTelegramCount();
    notes.push(`Valid phone attempt: telegramCount=${successCount} (expect >=1 if submission triggers)`);

    await page.screenshot({ path: path.join(DIRS.formsShots, "home_form_success.png"), fullPage: false });

  } catch (err) {
    notes.push(`ERROR: ${err.message}`);
    await page.screenshot({ path: path.join(DIRS.formsShots, "home_form_error.png"), fullPage: false });
  }

  writeFile(path.join(DIRS.forms, "home_form_notes.txt"), notes.join("\n"));
  await ctx.close();
}

async function testContactForm(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const getTelegramCount = await withTelegramMock(page);

  await safeGoto(page, `${BASE}/contact-us`);

  // Wait for page to fully load
  await page.waitForTimeout(3000);

  const form = page.locator("form#contact-form, form.contact-page-form").first();
  let failCount = 0;
  let successCount = 0;
  let notes = [`CONTACT FORM TEST @ ${nowISO()}`];

  try {
    await form.scrollIntoViewIfNeeded({ timeout: 10000 });
    await page.waitForTimeout(1000);

    const fillField = async (selectors, value) => {
      for (const sel of selectors) {
        try {
          const el = form.locator(sel).first();
          if (await el.count() > 0) {
            await el.fill(value, { timeout: 5000 });
            return true;
          }
        } catch {}
      }
      return false;
    };

    // Fill form fields
    await fillField(['#Full-Name', 'input[name="Full-Name"]', 'input[placeholder*="Name"]'], "Test User");
    await fillField(['#Email', 'input[type="email"]'], "test@example.com");
    await fillField(['#Phone', 'input[type="tel"]'], "123"); // invalid
    await fillField(['#Message-Subject', 'input[name="Message-Subject"]'], "Baseline test");
    await fillField(['#investment-input', 'input[name="investment"]'], "1000");
    await fillField(['#specialist-input', 'input[name="specialist"]'], "Any");
    await fillField(['#Message', 'textarea'], "Baseline test message.");

    // Country + Town (best effort)
    try {
      const country = form.locator("#country-input, select[name='country']").first();
      if (await country.count() > 0) {
        await country.waitFor({ state: "visible", timeout: 5000 });
        const opts = await country.locator("option").count();
        if (opts > 1) await country.selectOption({ index: 1 });
      }
    } catch {}
    try {
      const town = form.locator("#town-input, select[name='town']").first();
      if (await town.count() > 0) {
        const opts = await town.locator("option").count();
        if (opts > 1) await town.selectOption({ index: 1 });
      }
    } catch {}

    // Submit (invalid phone)
    const submitBtn = form.locator('button[type="submit"], input[type="submit"], .submit-button-2').first();
    if (await submitBtn.count() > 0) {
      await submitBtn.click({ timeout: 5000 });
    }
    await page.waitForTimeout(1500);

    failCount = getTelegramCount();
    notes.push(`Invalid phone attempt: telegramCount=${failCount} (expect 0 if validation blocks)`);

    await page.screenshot({ path: path.join(DIRS.formsShots, "contact_form_invalid_phone_blocked.png"), fullPage: false });

    // SUCCESS: valid phone
    await fillField(['#Phone', 'input[type="tel"]'], "+447911123456");
    if (await submitBtn.count() > 0) {
      await submitBtn.click({ timeout: 5000 });
    }
    await page.waitForTimeout(2000);

    successCount = getTelegramCount();
    notes.push(`Valid phone attempt: telegramCount=${successCount} (expect >=1 if submission triggers)`);

    await page.screenshot({ path: path.join(DIRS.formsShots, "contact_form_success.png"), fullPage: false });

  } catch (err) {
    notes.push(`ERROR: ${err.message}`);
    await page.screenshot({ path: path.join(DIRS.formsShots, "contact_form_error.png"), fullPage: false });
  }

  notes.push(`NOTE: Country/Town selects may fail if API blocked; review screenshots + console logs.`);
  writeFile(path.join(DIRS.forms, "contact_form_notes.txt"), notes.join("\n"));
  await ctx.close();
}

async function testQuestionnaire(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const getTelegramCount = await withTelegramMock(page);

  await safeGoto(page, `${BASE}/recovery-questionnaire`);

  // Helper: fill visible required inputs/selects/radios on current step (best effort)
  async function fillVisibleStep() {
    const step = page.locator(".quiz-step:visible").first();

    // radios: click first visible label
    const radioLabel = step.locator("label.w-radio:visible").first();
    if (await radioLabel.count()) {
      try { await radioLabel.click({ timeout: 1000 }); } catch {}
    }

    // selects
    const selects = step.locator("select:visible");
    const selCount = await selects.count();
    for (let i = 0; i < selCount; i++) {
      const sel = selects.nth(i);
      try {
        const optCount = await sel.locator("option").count();
        if (optCount > 1) await sel.selectOption({ index: 1 });
      } catch {}
    }

    // text/email/tel inputs (required or visible)
    const inputs = step.locator("input:visible");
    const inCount = await inputs.count();
    for (let i = 0; i < inCount; i++) {
      const el = inputs.nth(i);
      const type = (await el.getAttribute("type")) || "text";
      const id = (await el.getAttribute("id")) || "";
      const name = (await el.getAttribute("name")) || "";
      // Skip hidden/system fields
      if (type === "hidden") continue;

      // Only fill if empty
      const val = await el.inputValue().catch(() => "");
      if (val && val.trim() !== "") continue;

      let fill = "Test";
      if (type === "email" || id.toLowerCase().includes("email") || name.toLowerCase().includes("email")) fill = "test@example.com";
      if (type === "tel" || id.toLowerCase().includes("phone") || name.toLowerCase().includes("phone")) fill = "+447911123456";
      if (id === "id-case") fill = "CW-BASELINE-TEST";
      try { await el.fill(fill); } catch {}
    }

    // textarea
    const ta = step.locator("textarea:visible").first();
    if (await ta.count()) {
      try { await ta.fill("Baseline test"); } catch {}
    }
  }

  async function clickNext() {
    const btn = page.locator(".quiz-step:visible .next-button:visible").first();
    if (await btn.count()) {
      await btn.click().catch(() => {});
      await page.waitForTimeout(700);
    }
  }

  // Advance to step 18 (best effort)
  for (let i = 0; i < 17; i++) {
    await fillVisibleStep();
    await clickNext();
  }

  // Step 18 evidence
  await page.screenshot({ path: path.join(DIRS.formsShots, "questionnaire_step18.png"), fullPage: false });

  // Next to step 19
  await fillVisibleStep();
  await clickNext();
  await page.waitForTimeout(800);

  // Step 19 evidence (duplicate Email label issue)
  await page.screenshot({ path: path.join(DIRS.formsShots, "questionnaire_step19.png"), fullPage: false });

  // FAILURE submit: invalid phone should block request
  const step19 = page.locator(".quiz-step:visible").first();
  try { await step19.locator("#Name").fill("Test User"); } catch {}
  try { await step19.locator("#Email").fill("test@example.com"); } catch {}
  try { await step19.locator("#Phone").fill("123"); } catch {} // invalid
  try { await step19.locator("#id-case").fill("CW-BASELINE-TEST"); } catch {}

  // submit button in step 19 is: button.submit
  try { await step19.locator("button.submit").click(); } catch {}
  await page.waitForTimeout(1500);

  const failCount = getTelegramCount();
  await page.screenshot({ path: path.join(DIRS.formsShots, "questionnaire_invalid_phone_blocked.png"), fullPage: false });

  // SUCCESS submit
  try { await step19.locator("#Phone").fill("+447911123456"); } catch {}
  try { await step19.locator("button.submit").click(); } catch {}
  await page.waitForTimeout(1600);

  const successCount = getTelegramCount();
  await page.screenshot({ path: path.join(DIRS.formsShots, "questionnaire_submit_success.png"), fullPage: false });

  writeFile(
    path.join(DIRS.forms, "questionnaire_notes.txt"),
    [
      `QUESTIONNAIRE`,
      `Invalid attempt telegramCount=${failCount} (expect 0 if validation blocks)`,
      `Valid attempt telegramCount=${successCount} (expect >=1 if submission triggers)`,
      `Step 18 + Step 19 screenshots captured for known content/label mismatches.`,
    ].join("\n")
  );

  await ctx.close();
}

async function testDetailServiceForm(browser) {
  // Try both /detail_service and /detail_service.html
  const candidates = [`${BASE}/detail_service`, `${BASE}/detail_service.html`];

  for (const url of candidates) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const getTelegramCount = await withTelegramMock(page);

    const resp = await safeGoto(page, url);
    const status = resp ? resp.status() : 0;

    if (!resp || status >= 400) {
      writeFile(path.join(DIRS.forms, `detail_service_skip_${encodeURIComponent(url)}.txt`), `SKIPPED: ${url} status=${status || "NO_RESPONSE"}`);
      await ctx.close();
      continue;
    }

    const form = page.locator("form.service-form");
    if (!(await form.count())) {
      writeFile(path.join(DIRS.forms, `detail_service_skip_${encodeURIComponent(url)}.txt`), `NO FORM FOUND: ${url}`);
      await ctx.close();
      continue;
    }

    // failure
    await form.locator("#name").fill("Test User");
    await form.locator("#Email").fill("test@example.com");
    await form.locator("#Phone").fill("123"); // invalid
    await form.locator("input[type=submit], button[type=submit]").first().click();
    await page.waitForTimeout(1200);

    const failCount = getTelegramCount();
    await page.screenshot({ path: path.join(DIRS.formsShots, "detail_service_invalid_phone_blocked.png"), fullPage: false });

    // success
    await form.locator("#Phone").fill("+447911123456");
    await form.locator("input[type=submit], button[type=submit]").first().click();
    await page.waitForTimeout(1500);

    const successCount = getTelegramCount();
    await page.screenshot({ path: path.join(DIRS.formsShots, "detail_service_success.png"), fullPage: false });

    writeFile(
      path.join(DIRS.forms, `detail_service_notes_${encodeURIComponent(url)}.txt`),
      [
        `DETAIL SERVICE FORM`,
        `URL=${url}`,
        `Invalid attempt telegramCount=${failCount} (expect 0 if validation blocks)`,
        `Valid attempt telegramCount=${successCount} (expect >=1 if submission triggers)`,
      ].join("\n")
    );

    await ctx.close();
  }
}

async function verifyDomainRedirects(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const targets = [
    "https://countwize.com/",
    "https://www.countwize.com/",
  ];

  const lines = [`DOMAIN REDIRECT CHECK @ ${nowISO()}`];

  for (const u of targets) {
    const resp = await safeGoto(page, u);
    lines.push(`INPUT=${u}`);
    lines.push(`STATUS=${resp ? resp.status() : "NO_RESPONSE"}`);
    lines.push(`FINAL_URL=${page.url()}`);
    lines.push("---");
  }

  writeFile(path.join(DIRS.root, "domain_redirects.txt"), lines.join("\n"));
  await ctx.close();
}

async function main() {
  // Create folder structure
  Object.values(DIRS).forEach(ensureDir);

  writeFile(
    path.join(DIRS.root, "PHASE_1B_RUN_INFO.txt"),
    [
      `CountWize Phase 1B Evidence Capture`,
      `BASE=${BASE}`,
      `OUT=${OUT}`,
      `TIME=${nowISO()}`,
      `NOTE=No code changes; evidence only.`,
    ].join("\n")
  );

  const browser = await chromium.launch({ headless: true });

  // Evidence capture
  await verifyDomainRedirects(browser);
  await captureScreenshots(browser);
  await captureConsoleLogs(browser);
  await captureHAR(browser);
  await runAxe(browser);

  // Form evidence
  await testHomeForm(browser);
  await testContactForm(browser);
  await testQuestionnaire(browser);
  await testDetailServiceForm(browser);

  await browser.close();

  writeFile(
    path.join(DIRS.root, "PHASE_1B_DONE.txt"),
    `DONE @ ${nowISO()}\nReview outputs in ${OUT}/`
  );

  console.log(`✅ Phase 1B artifacts saved to: ${OUT}/`);
}

main().catch((err) => {
  console.error("❌ Phase 1B capture failed:", err);
  process.exit(1);
});
