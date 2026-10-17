import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4321';
const candidates = [process.env.BROWSER_EXECUTABLE, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].filter(Boolean);
const executablePath = candidates.find(existsSync);
assert.ok(executablePath, 'Set BROWSER_EXECUTABLE to an installed Chromium browser.');
const browser = await chromium.launch({ executablePath, headless: true });
const output = join(process.cwd(), 'artifacts');
mkdirSync(output, { recursive: true });
const report = { base, checked: [], home: [], staticOnly: false, noJS: false, issues: [] };

try {
  for (const direction of ['editorial', 'mineral']) for (const headline of ['claridad', 'diseno', 'tranquilidad']) {
    for (const width of [320, 390, 768, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: width < 768 ? 1100 : 1000 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [];
      const remoteRequests = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('request', (request) => { if (!request.url().startsWith(base)) remoteRequests.push(request.url()); });
      const response = await page.goto(`${base}/preview/${direction}/${headline}/`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      assert.equal(overflow, false, `Horizontal overflow: ${direction}/${headline} @ ${width}`);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('.hero-visual figcaption').isVisible(), true);
      assert.equal(await page.locator('form, input').count(), 0);
      assert.deepEqual(errors, []);
      assert.deepEqual(remoteRequests, []);
      const typography = await page.evaluate(() => ({
        heading: getComputedStyle(document.querySelector('h1')).fontFamily,
        serifLoaded: document.fonts.check('400 16px "Source Serif 4"'),
        sansLoaded: document.fonts.check('400 16px "Inter"'),
      }));
      if (direction === 'editorial') assert.equal(typography.serifLoaded, true);
      else assert.ok(typography.heading.includes('Inter'));
      assert.equal(typography.sansLoaded, true);
      if (width === 390 || width === 1440) {
        const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
        const violations = axe.violations.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map((node) => node.target) }));
        if (violations.length) report.issues.push({ direction, headline, width, violations });
        await page.screenshot({ path: join(output, `${direction}-${headline}-${width}.png`), fullPage: true });
        await page.screenshot({ path: join(output, `${direction}-${headline}-${width}-hero.png`) });
      }
      if (width === 390) {
        await page.locator('.mobile-menu summary').click();
        assert.equal(await page.locator('.mobile-menu').getAttribute('open'), '');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.mobile-menu').getAttribute('open'), null);
        assert.equal(await page.locator('.mobile-menu summary').evaluate((el) => el === document.activeElement), true);
        await page.locator('.variant-controls summary').click();
        const other = direction === 'editorial' ? 'mineral' : 'editorial';
        const link = page.locator(`.variant-panel a[href="/preview/${other}/${headline}/"]`);
        assert.equal(await link.isVisible(), true);
        const panelOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
        assert.equal(panelOverflow, false);
      }
      report.checked.push({ direction, headline, width, typography, overflow });
      console.log(`OK ${direction}/${headline} @ ${width}px`);
      await context.close();
    }
  }
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    const failedResources = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('requestfailed', (request) => failedResources.push(request.url()));
    page.on('response', (response) => { if (response.status() >= 400) failedResources.push(response.url()); });
    const response = await page.goto(`${base}/`, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.equal(await page.locator('.hero-visual svg').isVisible(), true);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://modulith.com.co/');
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
    for (const href of await page.locator('a[href^="#"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')))) {
      assert.equal(await page.locator(href).count(), 1, `Missing anchor: ${href}`);
    }
    if (width < 768) {
      await page.locator('.mobile-menu summary').click();
      await page.locator('.mobile-menu a[href="#servicios"]').click();
      assert.ok(page.url().endsWith('#servicios'));
      assert.equal(await page.locator('.mobile-menu').getAttribute('open'), null);
    }
    await page.locator('.button-primary').click();
    assert.ok(page.url().endsWith('#preview-pendientes'));
    await page.locator('.hero-copy .text-link').click();
    assert.ok(page.url().endsWith('#preview-pendientes'));
    assert.deepEqual(errors, []);
    assert.deepEqual(failedResources, []);
    if (width === 390 || width === 1440) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: join(output, `home-${width}.png`), fullPage: true });
    }
    report.home.push({ width, status: response.status(), errors, failedResources });
    await context.close();
    console.log(`OK Home / @ ${width}px`);
  }
  const page = await browser.newPage();
  await page.goto(`${base}/preview/`);
  assert.equal(await page.locator('.direction-card nav a').count(), 6);
  await page.locator('.direction-card nav a').first().click();
  assert.ok(page.url().endsWith('/preview/editorial/claridad/'));
  await page.locator('.button-primary').click();
  assert.ok(page.url().endsWith('#preview-pendientes'));
  const runtime = await page.request.get(`${base}/api/runtime/`);
  assert.equal(runtime.status(), 404);
  report.staticOnly = true;
  const favicon = await page.request.get(`${base}/favicon.svg`);
  assert.equal(favicon.status(), 200);
  assert.match(favicon.headers()['content-type'], /image\/svg\+xml/);
  const missing = await page.request.get(`${base}/missing-preview-page/`);
  assert.equal(missing.status(), 404);
  const disabledContact = await page.request.post(`${base}/api/contacto/`, { data: {} });
  assert.equal(disabledContact.ok(), false);
  await page.close();
  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const staticPage = await noJS.newPage();
  await staticPage.goto(`${base}/preview/editorial/tranquilidad/`);
  assert.equal(await staticPage.locator('h1').isVisible(), true);
  await staticPage.locator('.mobile-menu summary').click();
  assert.equal(await staticPage.locator('.mobile-menu nav').isVisible(), true);
  await staticPage.locator('.mobile-menu a[href="#servicios"]').click();
  assert.ok(staticPage.url().endsWith('#servicios'));
  report.noJS = true;
  await noJS.close();
  assert.deepEqual(report.issues, [], 'Accessibility violations: see artifacts/preview-report.json');
  console.log('PASS: 24 variant and 4 homepage responsive cases, menu, comparison, no JS, static output, favicon, 404 and no capture.');
} finally {
  writeFileSync(join(output, 'preview-report.json'), JSON.stringify(report, null, 2));
  await browser.close();
}
