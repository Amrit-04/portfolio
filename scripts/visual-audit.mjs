import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
const folder = process.argv[2] || "screenshots/adaptation-final";
mkdirSync(folder, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = {
  captured: new Date().toISOString(),
  base: "http://127.0.0.1:4183/portfolio/",
  states: [],
};
for (const [name, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
  ["small", 360, 640],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    isMobile: width < 600,
    hasTouch: width < 600,
  });
  const errors = [],
    bad = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("response", (r) => {
    if (r.status() >= 400) bad.push(r.url());
  });
  async function shot(state) {
    await page.screenshot({ path: `${folder}/${name}-${state}.png` });
    report.states.push({
      name,
      width,
      height,
      state,
      ...(await page.evaluate(() => ({
        scrollY,
        overflow: document.documentElement.scrollWidth - innerWidth,
        sections: [
          ...document.querySelectorAll(
            ".paper-section,.paper-nav,.paper-dialog[open]",
          ),
        ].map((e) => ({
          id: e.id,
          classes: e.className,
          rect: e.getBoundingClientRect().toJSON(),
        })),
      }))),
    });
  }
  await page.goto(report.base);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1500);
  if (await page.locator(".mobile-gate").count()) {
    await shot("gate");
    await page.getByRole("button", { name: "I DON'T CARE" }).click();
  }
  await shot("home");
  for (const id of ["about", "work", "links"]) {
    await page.locator(`nav a[href="#${id}"]`).click();
    await page.waitForTimeout(2600);
    await shot(id);
  }
  const categories =
    name === "small"
      ? ["research", "playground"]
      : ["ai", "systems", "quant", "algorithms", "research", "playground"];
  for (const id of categories) {
    const trigger = page.getByTestId(`category-${id}`);
    await trigger.scrollIntoViewIfNeeded();
    if (name === "desktop") {
      await trigger.hover();
      await page.waitForTimeout(450);
      await shot(`hover-${id}`);
    }
    await trigger.click();
    await page.locator(".wall-dialog[open]").waitFor();
    await page.waitForTimeout(1800);
    await shot(`wall-${id}`);
    if (id === "research" || id === "playground") {
      for (const selector of id === "research"
        ? [".research-paper", ".cv-paper", ".skills-paper"]
        : [".homelab-paper", ".experiments-paper"]) {
        const sheet = page.locator(selector);
        await sheet.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        await shot(`${id}-${selector.slice(1)}`);
        if (name === "small" && selector === ".cv-paper") {
          await sheet
            .getByRole("link", { name: /résumé/i })
            .click({ trial: true });
        }
      }
    }
    if (id === "ai") {
      await page.getByTestId("open-notebook-neural-query-optimizer").click();
      await page.waitForTimeout(1000);
      await shot("notebook");
      await page.keyboard.press("Escape");
    }
    await page.getByRole("button", { name: /^Close .* wall$/ }).click();
  }
  await page.getByRole("button", { name: /SOCIALS/ }).click();
  await page.waitForTimeout(400);
  await shot("socials");
  await page.keyboard.press("Escape");
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(2200);
  await shot("signoff");
  report.states.push({ name, errors, bad });
  await page.close();
}
await browser.close();
writeFileSync("docs/adaptation-visual.json", JSON.stringify(report, null, 2));
console.log(report.states.filter((x) => x.errors || x.overflow));
if (report.states.some((x) => x.errors?.length || x.bad?.length || x.overflow))
  process.exitCode = 1;
