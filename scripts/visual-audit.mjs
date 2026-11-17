import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
const folder = process.argv[2] || "screenshots/final";
mkdirSync(folder, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const log = [];
for (const [name, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
  ["small", 360, 640],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    isMobile: width < 600,
    hasTouch: width < 600,
    reducedMotion: "reduce",
  });
  page.on("pageerror", (e) => log.push({ name, error: e.message }));
  await page.goto("http://127.0.0.1:4183/portfolio/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${folder}/${name}-hero.png` });
  log.push({
    name,
    overflow: await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  });
  for (const id of [
    "work",
    "about",
    "skills",
    "research",
    "homelab",
    "notebook",
    "contact",
  ]) {
    await page.locator("#" + id).scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${folder}/${name}-${id}.png` });
  }
  if (name === "desktop") {
    await page.screenshot({
      path: `${folder}/desktop-full.png`,
      fullPage: true,
    });
    await page.getByTestId("open-notebook-tradeflow").click();
    await page.getByRole("dialog").waitFor();
    await page.screenshot({ path: `${folder}/desktop-detail.png` });
    await page.getByTestId("close-notebook-btn").click();
  }
  await page.close();
}
writeFileSync(`${folder}/layout-results.json`, JSON.stringify(log, null, 2));
console.log(log);
await browser.close();
