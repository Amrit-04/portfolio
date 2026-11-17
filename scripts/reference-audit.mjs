import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync("screenshots/references", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const evidence = { browser: browser.version(), pages: [] };
for (const [name, url] of [
  ["tiago", "https://tiagofragoso.com"],
  ["freerider", "https://www.freeriderhd.com"],
  ["production", "https://amrit-04.github.io/portfolio/"],
]) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(2000);
    evidence.pages.push({
      name,
      url: page.url(),
      title: await page.title(),
      text: (await page.locator("body").innerText()).slice(0, 13000),
      links: await page
        .locator("a")
        .evaluateAll((es) =>
          es
            .map((e) => ({ text: e.textContent?.trim(), href: e.href }))
            .filter((x) => x.text),
        ),
    });
    await page.screenshot({
      path: `screenshots/references/${name}-desktop.png`,
    });
    if (name === "tiago") {
      for (const id of ["about", "work", "links"]) {
        await page.evaluate(
          (id) => document.getElementById(id)?.scrollIntoView(),
          id,
        );
        await page.waitForTimeout(900);
        await page.screenshot({
          path: `screenshots/references/tiago-${id}.png`,
        });
      }
      await page.goto("https://tiagofragoso.com/#modal-1");
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: "screenshots/references/tiago-detail.png",
      });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(url);
      await page.screenshot({
        path: "screenshots/references/tiago-mobile.png",
      });
      await page.setViewportSize({ width: 1440, height: 1000 });
    }
    if (name === "freerider") {
      const track = page.locator('a[href*="/t/"]').first();
      if (await track.count()) {
        await track.click();
        await page.waitForTimeout(4000);
        evidence.pages.push({
          name: "freerider-track",
          url: page.url(),
          text: (await page.locator("body").innerText()).slice(0, 8000),
        });
        await page.keyboard.press("Enter");
        await page.keyboard.down("ArrowUp");
        await page.waitForTimeout(2500);
        await page.keyboard.up("ArrowUp");
        await page.screenshot({
          path: "screenshots/references/freerider-track.png",
        });
      }
    }
  } catch (e) {
    evidence.pages.push({ name, error: String(e) });
  }
}
writeFileSync(
  "docs/reference-evidence.json",
  JSON.stringify(evidence, null, 2),
);
console.log(JSON.stringify(evidence, null, 2));
await browser.close();
