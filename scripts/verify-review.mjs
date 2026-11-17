import { chromium } from '@playwright/test';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const output = 'screenshots/review-final';
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    const errors = [];
    page.on('pageerror', error => errors.push(String(error)));
    await page.goto(pathToFileURL(resolve('REVIEW.html')).href);
    await page.evaluate(() => {
      document.querySelectorAll('details').forEach(item => { item.open = true; });
      document.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
    });
    await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
    const state = await page.evaluate(() => ({
      images: document.images.length,
      broken: [...document.images].filter(image => !image.naturalWidth).map(image => image.src),
      openedGalleries: document.querySelectorAll('details[open]').length,
      overflow: document.documentElement.scrollWidth - innerWidth,
      localLinks: [...document.querySelectorAll('a[href]')].map(link => link.getAttribute('href')).filter(href => !/^https?:/.test(href)),
    }));
    const missing = state.localLinks.filter(link => !existsSync(resolve(link)));
    await page.screenshot({ path: `${output}/${name}-overview.png` });
    if (name === 'desktop') {
      const sections = page.locator('body > section');
      for (const [index, device] of [[0, 'desktop'], [1, 'mobile']]) {
        for (const label of ['about', 'work', 'wall research', 'wall playground']) {
          const detail = sections.nth(index).locator('details').filter({ has: page.locator('summary', { hasText: new RegExp(`^${label}$`) }) });
          await detail.locator('.pair').screenshot({ path: `${output}/pair-${device}-${label.replaceAll(' ', '-')}.png` });
        }
      }
    }
    results.push({ name, width, height, ...state, missing, errors });
    if (missing.length || state.broken.length || state.overflow || errors.length) throw new Error(`Review verification failed: ${name}`);
    await page.close();
  }
} finally {
  await browser.close();
}
writeFileSync('docs/review-verification.json', JSON.stringify({ captured: new Date().toISOString(), results }, null, 2));
console.log(results.map(({ localLinks, ...result }) => ({ ...result, localLinks: localLinks.length })));
