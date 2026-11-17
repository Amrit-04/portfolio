import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
const out = "screenshots/reference-clone";
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = {
  captured: new Date().toISOString(),
  source: "S:/website inspo (served unchanged)",
  viewports: [],
};
for (const [name, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
]) {
  const context = await browser.newContext({
    viewport: { width, height },
    hasTouch: width < 600,
    isMobile: width < 600,
  });
  const page = await context.newPage();
  const record = { name, width, height, errors: [], failed: [], states: [] };
  page.on("pageerror", (e) => record.errors.push(String(e)));
  page.on("response", (r) => {
    if (r.status() >= 400)
      record.failed.push({ url: r.url(), status: r.status() });
  });
  await page.goto("http://127.0.0.1:4190/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  async function shot(state) {
    await page.screenshot({ path: `${out}/${name}-${state}.png` });
    record.states.push({
      state,
      ...(await page.evaluate(() => ({
        scrollY,
        active: document
          .querySelector(".nav-link.active")
          ?.getAttribute("href"),
        sections: [
          ...document.querySelectorAll(
            ".section,.nav-bar,.modal-backdrop.open .modal-sheet",
          ),
        ].map((e) => ({
          id: e.id,
          classes: e.className,
          rect: e.getBoundingClientRect().toJSON(),
        })),
        paper: getComputedStyle(document.documentElement).getPropertyValue(
          "--paper-base",
        ),
      }))),
    });
  }
  if (width < 600) {
    await shot("gate");
    if (await page.locator("#mobile-gate.open").count()) {
      await page.locator("#gate-cta").click();
      await page.waitForTimeout(1200);
    }
  }
  await shot("home");
  for (const id of ["about", "work", "links"]) {
    await page.locator(`.nav-bar a[href="#${id}"]`).click();
    await page.waitForTimeout(2600);
    await shot(id);
  }
  await page.locator('.nav-bar a[href="#work"]').click();
  await page.waitForTimeout(1600);
  for (let i = 1; i <= 6; i++) {
    console.log(`Opening ${name} reference wall ${i}`);
    // A fresh navigation avoids the clone's stale lazy-media observer after
    // sequential modal closures; no source or DOM styles are modified.
    await page.goto("http://127.0.0.1:4190/", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(1800);
    if (await page.locator("#mobile-gate.open").count())
      await page.locator("#gate-cta").click();
    await page.locator('.nav-bar a[href="#work"]').click();
    await page.waitForTimeout(1600);
    const trigger = page.locator(`[data-modal-target="modal-${i}"]`);
    await trigger.scrollIntoViewIfNeeded();
    if (width > 600) {
      await trigger.hover();
      await page.waitForTimeout(450);
      await shot(`hover-${i}`);
    }
    await trigger.click();
    await page.waitForTimeout(450);
    await page.locator(`#modal-${i}.open`).waitFor({ timeout: 10000 });
    await page.waitForTimeout(6200);
    await page.waitForFunction((id) => {
      const modal = document.querySelector(`#modal-${id}`);
      const sheet = modal?.querySelector('.modal-sheet');
      const media = [...(modal?.querySelectorAll('.bake-img, .wall-media img, .wall-media video') || [])];
      return modal && sheet && Number(getComputedStyle(modal).opacity) > .99 && Number(getComputedStyle(sheet).opacity) > .99 && media.some(item => item instanceof HTMLImageElement ? item.complete && item.naturalWidth > 0 : item instanceof HTMLVideoElement && item.readyState >= 1);
    }, i, { timeout: 15000 });
    await page.waitForTimeout(500);
    await shot(`wall-${i}`);
    const pieces = page.locator(
      `#modal-${i} .bake-hs, #modal-${i} .wall-trigger`,
    );
    record.states.at(-1).pieces = await pieces.count();
    if (i === 1 && (await pieces.count())) {
      await pieces.first().click();
      await page.waitForTimeout(1000);
      if (await page.locator(".lightbox.on").count()) {
        await shot("lightbox");
        await page.keyboard.press("Escape");
        await page.waitForTimeout(350);
      }
    }
    await page.locator(`#modal-${i} [data-close]`).click();
    await page.waitForTimeout(400);
  }
  await page.locator('.nav-bar a[href="#links"]').click();
  await page.waitForTimeout(1000);
  await page.keyboard.press("End");
  await page.waitForTimeout(2000);
  await shot("signoff");
  record.imageIssues = await page.evaluate(() =>
    [...document.images]
      .filter(
        (e) =>
          e.getBoundingClientRect().width > 0 &&
          (!e.complete || !e.naturalWidth),
      )
      .map((e) => ({ src: e.src, loading: e.loading })),
  );
  report.viewports.push(record);
  await context.close();
}
writeFileSync(
  "docs/reference-clone-audit.json",
  JSON.stringify(report, null, 2),
);
await browser.close();
console.log(JSON.stringify(report, null, 2));
