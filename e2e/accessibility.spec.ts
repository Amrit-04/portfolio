import { test, expect } from "@playwright/test";
test("keyboard notebook trap, Escape, focus return, tabs and canonical contact", async ({
  page,
}) => {
  await page.goto("./");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to projects" }),
  ).toBeFocused();
  const trigger = page.getByTestId("open-notebook-tradeflow");
  await trigger.click();
  const modal = page.getByRole("dialog");
  await expect(
    page.getByRole("button", { name: "Close notebook", exact: true }),
  ).toBeFocused();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => !!document.activeElement?.closest("dialog")),
    ).toBe(true);
  }
  await page
    .getByRole("button", { name: "Close notebook", exact: true })
    .focus();
  await page.keyboard.press("Shift+Tab");
  expect(
    await page.evaluate(() => !!document.activeElement?.closest("dialog")),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(modal).not.toBeVisible();
  await expect(trigger).toBeFocused();
  const first = page.getByRole("tab", { name: "01 Languages" });
  await first.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("tab", { name: "02 Backend" })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("FastAPI");
  await page.keyboard.press("End");
  await expect(page.getByRole("tabpanel")).toContainText("Playwright");
  await page
    .getByRole("button", { name: "Local LLMs Inference / exploration" })
    .click();
  await expect(page.locator(".lab-note")).toContainText("Llama 3.2");
  const email = page.locator(".contact-email");
  await expect(email).toHaveAttribute(
    "href",
    "mailto:amriteshyadav2004@gmail.com",
  );
  await expect(email).toContainText("amriteshyadav2004@gmail.com");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBe(0);
});
test("workshop hotspots and browser history preserve usable navigation", async ({
  page,
}) => {
  await page.goto("./");
  await page
    .getByRole("link", { name: "Camera: open workplace safety project" })
    .click();
  await expect(page.getByRole("dialog")).toContainText("Workplace Safety");
  await page.keyboard.press("Escape");
  await page
    .getByRole("link", { name: "Bicycle: ride the Engineering Trail" })
    .click();
  await expect(page.getByTestId("ride-mode")).toBeVisible();
  await page.goBack();
  await expect(page.locator(".world-portfolio")).toBeVisible();
  await page.goForward();
  await expect(
    page.getByRole("button", { name: "Start riding" }),
  ).toBeVisible();
});
test("base-path assets, reduced motion and no-JavaScript contact remain usable", async ({
  page,
  browser,
  baseURL,
}) => {
  const bad: string[] = [];
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().startsWith(baseURL!)) bad.push(r.url());
  });
  await page.goto("./");
  await page.evaluate(() => document.fonts.ready);
  expect(bad).toEqual([]);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  const href = await page.getByTestId("resume-btn").getAttribute("href");
  const response = await page.request.get(href!);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("pdf");
  const context = await browser.newContext({ javaScriptEnabled: false }),
    fallback = await context.newPage();
  await fallback.goto(baseURL!);
  await expect(fallback.locator("noscript")).toBeVisible();
  await expect(fallback.locator('noscript a[href^="mailto:"]')).toBeVisible();
  await expect(fallback.locator('noscript a[href$=".pdf"]')).toHaveAttribute(
    "href",
    "/portfolio/resumes/Amriteshkumar_Yadav_.pdf",
  );
  await context.close();
});
