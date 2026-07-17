import { chromium, devices } from 'playwright';

const BASE = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const SECTIONS = ['treatments', 'how-it-works', 'reviews', 'faqs', 'contact'];

async function openMobileMenu(page) {
  const burger = page.locator('.burger-menu-btn');
  if (await burger.isVisible()) {
    const open = await page.locator('#primary-navigation.mobile-open').count();
    if (!open) {
      await burger.click();
      await page.waitForSelector('#primary-navigation.mobile-open');
      await page.waitForTimeout(250);
    }
  }
}

async function measureAfterClick(page, sectionId) {
  await openMobileMenu(page);
  await page.locator(`a[href="/#${sectionId}"]`).first().click();
  await page.waitForTimeout(1400);

  return page.evaluate((id) => {
    const el = document.getElementById(id);
    const navbar = document.querySelector('.navbar');
    if (!el || !navbar) return { ok: false, reason: 'missing nodes' };

    const elTop = el.getBoundingClientRect().top;
    const navBottom = navbar.getBoundingClientRect().bottom;
    const delta = elTop - navBottom;
    return {
      ok: delta >= 0 && delta <= 28,
      delta: Number(delta.toFixed(1)),
      elTop: Number(elTop.toFixed(1)),
      navBottom: Number(navBottom.toFixed(1)),
      hash: window.location.hash,
    };
  }, sectionId);
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.PW_CHANNEL || 'msedge',
  });
  const context = await browser.newContext({ ...devices['iPhone 13'] });
  const page = await context.newPage();
  const results = [];

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });

  for (const sectionId of SECTIONS) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(150);
    results.push({ sectionId, ...(await measureAfterClick(page, sectionId)) });
  }

  await page.goto(`${BASE}/treatment/peptide`, { waitUntil: 'networkidle' });
  await openMobileMenu(page);
  await page.locator('a[href="/#treatments"]').first().click();
  await page.waitForURL(/#treatments/);
  await page.waitForTimeout(1400);
  results.push({
    sectionId: 'treatments-from-peptide',
    ...(await page.evaluate(() => {
      const el = document.getElementById('treatments');
      const navbar = document.querySelector('.navbar');
      const delta = el.getBoundingClientRect().top - navbar.getBoundingClientRect().bottom;
      return {
        ok: delta >= 0 && delta <= 28,
        delta: Number(delta.toFixed(1)),
        hash: window.location.hash,
      };
    })),
  });

  await browser.close();

  const failed = results.filter((item) => !item.ok);
  console.log(JSON.stringify({ results, failed: failed.length }, null, 2));
  if (failed.length) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
