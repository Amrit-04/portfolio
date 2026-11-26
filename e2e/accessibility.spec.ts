import { test, expect } from "@playwright/test";
import { openNotebook } from "./paper-helpers";

test("nested notebook trap, Escape, focus return, research and canonical contact", async ({
  page,
}) => {
  await page.goto("./");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to projects" }),
  ).toBeFocused();
  await openNotebook(page, "tradeflow");
  const modal = page.getByTestId("project-detail-modal");
  await expect(
    page.getByRole("button", { name: "Close notebook", exact: true }),
  ).toBeFocused();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() =>
        document.activeElement?.closest("dialog")?.getAttribute("data-testid"),
      ),
    ).toBe("project-detail-modal");
  }
  await page
    .getByRole("button", { name: "Close notebook", exact: true })
    .focus();
  await page.keyboard.press("Shift+Tab");
  expect(
    await page.evaluate(() =>
      document.activeElement?.closest("dialog")?.getAttribute("data-testid"),
    ),
  ).toBe("project-detail-modal");
  await page.keyboard.press("Escape");
  await expect(modal).not.toBeVisible();
  await expect(page.getByTestId("wall-quant")).toBeVisible();
  await expect(page.getByTestId("open-notebook-tradeflow")).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("category-quant")).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
  await page.getByTestId("category-research").click();
  await expect(page.getByTestId("wall-research")).toContainText("FastAPI");
  await expect(page.getByTestId("wall-research")).toContainText("Playwright");
  await page.keyboard.press("Escape");
  await page.getByTestId("category-playground").click();
  await expect(page.getByTestId("wall-playground")).toContainText("Llama 3.2");
  await expect(page.getByTestId("wall-playground")).toContainText(
    "unconfirmed",
  );
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: /SOCIALS/ }).click();
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

test("category keyboard navigation and browser history preserve OpenRider", async ({
  page,
}) => {
  await page.goto("./");
  const category = page.getByTestId("category-ai");
  await category.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toHaveAccessibleName("AI + ML wall");
  await expect(
    page.getByRole("button", { name: "Close AI + ML wall" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  expect(
    await page.evaluate(
      () => !!document.activeElement?.closest(".paper-dialog"),
    ),
  ).toBe(true);
  await page.goBack();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByTestId("category-playground").click();
  await page.getByTestId("enter-track-nav").click();
  await expect(page).toHaveURL(/\/portfolio\/openrider\/index\.html$/);
  await page.goForward();
  await expect(page).toHaveTitle("Red Bull Rampage | OpenRider");
  await expect(
    page.getByRole("heading", { name: "RED BULL RAMPAGE" }),
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
  await expect(
    page.getByRole("button", { name: "Play project reel" }),
  ).toBeAttached();
  const frame = await page.locator(".reel-slide").getAttribute("data-frame");
  await page.waitForTimeout(4400);
  await expect(page.locator(".reel-slide")).toHaveAttribute(
    "data-frame",
    frame!,
  );
  await page.getByTestId("category-research").click();
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

test("reel controls, scrollspy, sign-off and bounded phone wall panning", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Next project in reel" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".reel-slide")).toHaveAttribute("data-frame", "1");
  await page.getByRole("button", { name: "Play project reel" }).click();
  await expect(
    page.getByRole("button", { name: "Pause project reel" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Pause project reel" }).click();
  for (const id of ["about", "work", "links"]) {
    await page.locator(`nav a[href="#${id}"]`).click();
    await expect(page.locator(`nav a[href="#${id}"]`)).toHaveAttribute(
      "aria-current",
      "location",
    );
  }
  await page
    .getByRole("button", { name: "A small thought from the programmer" })
    .click();
  await expect(page.locator(".gag-aside")).toHaveText(
    "A good question is usually the beginning.",
  );
  await page
    .getByRole("button", { name: "A small thought from the programmer" })
    .click();
  await expect(page.locator(".gag-aside")).toContainText("physics");
  await page.getByTestId("category-ai").click();
  const scroller = page.locator(".paper-wall-scroll");
  if (page.viewportSize()!.width < 600) {
    expect(
      await scroller.evaluate((e) => e.scrollWidth / e.clientWidth),
    ).toBeGreaterThan(1.7);
    await scroller.focus();
    await page.keyboard.press("ArrowRight");
    await expect
      .poll(() => scroller.evaluate((e) => e.scrollLeft))
      .toBeGreaterThan(0);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBe(0);
});

test("normal-motion mobile gate and touch preview cancel/open sequence", async ({
  page,
}, info) => {
  test.skip(
    !info.project.name.startsWith("Mobile"),
    "Touch-first sequence is specific to phone layout.",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("./");
  await expect(
    page.getByRole("dialog", { name: "Small-screen note" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "I DON'T CARE" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.reload();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.locator('nav a[href="#work"]').click();
  const box = page.getByTestId("category-ai");
  await box.tap();
  await expect(box).toHaveClass(/tap-active/);
  await page.locator('nav a[href="#work"]').tap();
  await page.waitForTimeout(950);
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await box.tap();
  await expect(
    page.getByRole("dialog", { name: "AI + ML wall" }),
  ).toBeVisible();
});
