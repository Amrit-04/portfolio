import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
const base = "http://127.0.0.1:4183/portfolio/";
mkdirSync("screenshots/final", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
for (const [name, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
  ["small", 360, 640],
]) {
  const context = await browser.newContext({
      viewport: { width, height },
      isMobile: width < 600,
      hasTouch: width < 600,
      reducedMotion: "reduce",
    }),
    page = await context.newPage(),
    errors = [],
    bad = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) bad.push({ url: r.url(), status: r.status() });
  });
  await page.addInitScript(() => {
    window.__metrics = { lcp: 0, cls: 0 };
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) window.__metrics.lcp = e.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries())
        if (!e.hadRecentInput) window.__metrics.cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle");
  const resources = await page.evaluate(() =>
      performance.getEntriesByType("resource").map((r) => ({
        name: r.name.replace(location.origin, ""),
        bytes: r.transferSize,
        duration: r.duration,
        start: r.startTime,
      })),
    ),
    metrics = await page.evaluate(() => ({
      ...window.__metrics,
      paint: performance
        .getEntriesByType("paint")
        .map((x) => ({ name: x.name, time: x.startTime })),
    }));
  const audit = async (state) => {
    const a = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    results.push({
      name,
      state,
      overflow: await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
      violations: a.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    });
  };
  await audit("portfolio");
  results.push({ name, resources, metrics });
  for (const category of [
    "ai",
    "systems",
    "quant",
    "algorithms",
    "research",
    "playground",
  ]) {
    await page.getByTestId(`category-${category}`).click();
    await audit(`wall:${category}`);
    await page.keyboard.press("Escape");
  }
  const projects =
    name === "small"
      ? ["neural-query-optimizer"]
      : [
          "neural-query-optimizer",
          "llm-reliability-control-plane",
          "fault-tolerant-ml-telemetry",
          "tradeflow",
          "moneyball",
          "warehouse-routing-engine",
          "workplace-safety-vision",
        ];
  const readyIds = [
    "demo-neural-query-optimizer",
    "lrcp-search",
    "replay-play",
    "tf-state",
    "mb-var",
    "wh-grid",
    "wsv-canvas",
  ];
  const allIds = [
    "neural-query-optimizer",
    "llm-reliability-control-plane",
    "fault-tolerant-ml-telemetry",
    "tradeflow",
    "moneyball",
    "warehouse-routing-engine",
    "workplace-safety-vision",
  ];
  for (const id of projects) {
    const category = {
      "neural-query-optimizer": "ai",
      "workplace-safety-vision": "ai",
      "llm-reliability-control-plane": "systems",
      "fault-tolerant-ml-telemetry": "systems",
      tradeflow: "quant",
      moneyball: "quant",
      "warehouse-routing-engine": "algorithms",
    }[id];
    await page.getByTestId(`category-${category}`).click();
    await page.getByTestId(`open-notebook-${id}`).click();
    await page
      .getByTestId(readyIds[allIds.indexOf(id)])
      .waitFor({ state: "attached" });
    if (id === "neural-query-optimizer")
      await page
        .locator('[data-inference-mode="model_inference"]')
        .waitFor({ state: "attached" });
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `screenshots/final/${name}-detail-${id}.png`,
    });
    await page.getByRole("link", { name: "Jump to experiment" }).click();
    await page.screenshot({ path: `screenshots/final/${name}-demo-${id}.png` });
    await audit(`notebook:${id}`);
    await page.getByRole("button", { name: "Close notebook" }).click();
    await page.keyboard.press("Escape");
  }
  await page.goto(base + "#/ride");
  await page.getByRole("button", { name: "Start riding" }).waitFor();
  await page.screenshot({ path: `screenshots/final/${name}-game-ready.png` });
  await audit("game-ready");
  await page.getByRole("button", { name: "Start riding" }).click();
  await page.keyboard.down("w");
  const timing = await page.evaluate(
    () =>
      new Promise((resolve) => {
        let prev = performance.now();
        const times = [];
        function tick(now) {
          times.push(now - prev);
          prev = now;
          if (times.length < 120) requestAnimationFrame(tick);
          else {
            times.sort((a, b) => a - b);
            resolve({
              frames: times.length,
              medianMs: times[60],
              p95Ms: times[114],
              maxMs: times.at(-1),
            });
          }
        }
        requestAnimationFrame(tick);
      }),
  );
  await page.keyboard.up("w");
  await page.screenshot({ path: `screenshots/final/${name}-game-riding.png` });
  results.push({
    name,
    gameFrameTiming: timing,
    telemetry: JSON.parse(
      await page.locator("canvas").getAttribute("data-telemetry"),
    ),
    canvas: await page.locator("canvas").evaluate((c) => ({
      bufferWidth: c.width,
      bufferHeight: c.height,
      cssWidth: c.clientWidth,
      cssHeight: c.clientHeight,
    })),
  });
  await page.getByRole("button", { name: "Pause ride", exact: true }).click();
  await page.screenshot({ path: `screenshots/final/${name}-game-paused.png` });
  await audit("game-paused");
  await page.getByRole("button", { name: "Track editor", exact: true }).click();
  await page.screenshot({ path: `screenshots/final/${name}-editor.png` });
  await audit("editor");
  results.push({ name, errors, bad });
  await context.close();
}
await browser.close();
writeFileSync("docs/browser-quality.json", JSON.stringify(results, null, 2));
console.log(
  JSON.stringify(
    results.filter(
      (x) => x.violations?.length || x.gameFrameTiming || x.errors,
    ),
    null,
    2,
  ),
);
if (
  results.some((x) => x.errors?.length || x.bad?.length || x.violations?.length)
)
  process.exitCode = 1;
