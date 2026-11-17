import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
const state = async (p: Page) =>
  JSON.parse((await p.locator("canvas").getAttribute("data-telemetry"))!);
const enter = async (p: Page) => {
  await p.goto("./#/ride");
  await p.getByRole("button", { name: "Start riding" }).click();
};
test("sound is opt-in, synthesizes real audio and remains consistent on re-entry", async ({
  page,
}) => {
  const cdp = await page.context().newCDPSession(page);
  const contexts: string[] = [],
    nodes: string[] = [];
  cdp.on("WebAudio.contextCreated", ({ context }) =>
    contexts.push(context.contextId),
  );
  cdp.on("WebAudio.audioNodeCreated", ({ node }) => nodes.push(node.nodeType));
  await cdp.send("WebAudio.enable");
  await page.goto("./#/ride");
  await expect(page.getByRole("button", { name: "Enable sound" })).toHaveText(
    "Sound off",
  );
  expect(contexts).toHaveLength(0);
  await page.getByRole("button", { name: "Enable sound" }).click();
  await expect.poll(() => contexts.length).toBe(1);
  await expect
    .poll(() => nodes.some((n) => n.includes("Oscillator")))
    .toBe(true);
  await page.getByRole("button", { name: "← Portfolio", exact: true }).click();
  await page.getByTestId("category-playground").click();
  await page.getByTestId("enter-track-nav").click();
  await expect(page.getByRole("button", { name: "Mute sound" })).toHaveText(
    "Sound on",
  );
  await page.getByRole("button", { name: "Mute sound" }).click();
  await expect(page.getByRole("button", { name: "Enable sound" })).toHaveText(
    "Sound off",
  );
  const count = nodes.length;
  await page
    .getByRole("button", { name: "Start riding →", exact: true })
    .click();
  await page.keyboard.down("w");
  await expect.poll(async () => (await state(page)).stars).toBeGreaterThan(0);
  await page.keyboard.up("w");
  expect(nodes).toHaveLength(count);
});
test("wheel propulsion, braking, pause, reset, blur, exit and re-entry", async ({
  page,
}) => {
  await enter(page);
  const before = await state(page);
  await page.keyboard.down("w");
  await expect
    .poll(async () => (await state(page)).x)
    .toBeGreaterThan(before.x + 3);
  await page.keyboard.up("w");
  const moving = await state(page);
  expect(moving.rearSpin).toBeLessThan(-2);
  await page.keyboard.down("s");
  await expect
    .poll(async () => (await state(page)).speed)
    .toBeLessThan(moving.speed * 0.5);
  await page.keyboard.up("s");
  await page.keyboard.press("Space");
  await expect(
    page.getByRole("heading", { name: "ON THE BRAKES." }),
  ).toBeVisible();
  const paused = await state(page);
  await page.waitForTimeout(350);
  expect((await state(page)).steps).toBe(paused.steps);
  await page
    .getByRole("button", { name: "Continue riding", exact: true })
    .click();
  await page.keyboard.down("w");
  await expect.poll(async () => (await state(page)).input.accel).toBe(true);
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  await expect.poll(async () => (await state(page)).status).toBe("paused");
  expect((await state(page)).input.accel).toBe(false);
  await page.keyboard.up("w");
  await page
    .getByRole("button", { name: "Continue riding", exact: true })
    .click();
  await page.keyboard.press("Backspace");
  await expect.poll(async () => (await state(page)).x).toBeLessThan(3.1);
  expect((await state(page)).stars).toBe(0);
  await page.keyboard.press("Escape");
  await expect(page.locator(".paper-portfolio")).toBeVisible();
  await page.getByTestId("category-playground").click();
  await page.getByTestId("enter-track-nav").click();
  await expect(
    page.getByRole("heading", { name: "IDEAS. IN MOTION." }),
  ).toBeVisible();
  expect((await state(page)).input.accel).toBe(false);
});
test("editor draws both layers, erases, restores, exports/imports and isolates test ride", async ({
  page,
}) => {
  await page.goto("./#/ride");
  await page.getByRole("button", { name: "Track editor", exact: true }).click();
  const canvas = page.locator("canvas");
  const r = (await canvas.boundingBox())!;
  const drag = async (y: number) => {
    await page.mouse.move(r.x + r.width * 0.45, r.y + r.height * y);
    await page.mouse.down();
    await page.mouse.move(r.x + r.width * 0.7, r.y + r.height * (y - 0.05), {
      steps: 12,
    });
    await page.mouse.up();
  };
  await drag(0.56);
  await expect(page.getByTestId("editor-count")).toHaveText(
    "2 collision / 0 scenery",
  );
  await page.getByRole("button", { name: "Scenery line", exact: true }).click();
  await drag(0.33);
  await expect(page.getByTestId("editor-count")).toHaveText(
    "2 collision / 1 scenery",
  );
  await page.getByRole("button", { name: "Eraser", exact: true }).click();
  await page.mouse.click(r.x + r.width * 0.575, r.y + r.height * 0.305);
  await expect(page.getByTestId("editor-count")).toHaveText(
    "2 collision / 0 scenery",
  );
  await page.getByRole("button", { name: "Undo", exact: true }).click();
  await expect(page.getByTestId("editor-count")).toHaveText(
    "2 collision / 1 scenery",
  );
  await page.getByRole("button", { name: "Redo", exact: true }).click();
  await expect(page.getByTestId("editor-count")).toHaveText(
    "2 collision / 0 scenery",
  );
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export JSON", exact: true }).click();
  const download = await downloadPromise;
  const path = (await download.path())!;
  await page.getByRole("button", { name: "Clear", exact: true }).click();
  await expect(page.getByTestId("editor-count")).toHaveText(
    "0 collision / 0 scenery",
  );
  await page.getByRole("button", { name: "Test ride", exact: false }).click();
  await expect(page.getByRole("alert")).toContainText("starting platform");
  const chooserPromise = page.waitForEvent("filechooser");
  await page.getByRole("button", { name: "Import JSON", exact: true }).click();
  await (await chooserPromise).setFiles(path);
  await expect(page.getByTestId("editor-count")).toHaveText(
    "2 collision / 0 scenery",
  );
  await page.locator("input[type=file]").setInputFiles({
    name: "invalid.json",
    mimeType: "application/json",
    buffer: Buffer.from('{"version":99}'),
  });
  await expect(page.getByRole("alert")).toContainText("version 1");
  await expect(page.getByTestId("editor-count")).toHaveText(
    "2 collision / 0 scenery",
  );
  await page.getByRole("button", { name: "Test ride", exact: false }).click();
  await expect.poll(async () => (await state(page)).custom).toBe(true);
  await page
    .getByRole("button", { name: "Back to editor", exact: true })
    .click();
  await expect(page.getByTestId("editor-count")).toHaveText(
    "2 collision / 0 scenery",
  );
  await page.getByRole("button", { name: "Leave editor", exact: true }).click();
  expect((await state(page)).custom).toBe(false);
  expect((await state(page)).totalStars).toBe(20);
  await expect(page.getByTestId("section-name")).toHaveText("The Workshop");
});
test("multi-pointer holds remain independent and cancel safely", async ({
  page,
}) => {
  await enter(page);
  const pedal = page.getByRole("button", { name: "Pedal", exact: true }),
    lean = page.getByRole("button", { name: "Lean back", exact: true });
  const cdp = await page.context().newCDPSession(page),
    pr = (await pedal.boundingBox())!,
    lr = (await lean.boundingBox())!;
  const one = { id: 1, x: pr.x + pr.width / 2, y: pr.y + pr.height / 2 },
    two = { id: 2, x: lr.x + lr.width / 2, y: lr.y + lr.height / 2 };
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [one, two],
  });
  await expect
    .poll(async () => (await state(page)).input)
    .toMatchObject({ accel: true, leanB: true });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [two],
  });
  await expect
    .poll(async () => (await state(page)).input)
    .toMatchObject({ accel: true, leanB: false });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchCancel",
    touchPoints: [],
  });
  await expect.poll(async () => (await state(page)).input.accel).toBe(false);
});
test("a genuine gap causes a physical crash and checkpoint retry restores the rider", async ({
  page,
}, info) => {
  await page.goto("./#/ride");
  await page.getByRole("button", { name: "Track editor", exact: true }).click();
  const document = {
    version: 1,
    name: "Crash verification",
    physics: [
      { a: { x: -5, y: 0 }, b: { x: 8, y: 0 } },
      { a: { x: 30, y: 0 }, b: { x: 35, y: 0 } },
    ],
    scenery: [],
  };
  await page.locator("input[type=file]").setInputFiles({
    name: "gap.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(document)),
  });
  await page.getByRole("button", { name: "Test ride", exact: false }).click();
  await page.locator("canvas").focus();
  await page.keyboard.down("w");
  await expect
    .poll(async () => (await state(page)).status, { timeout: 12000 })
    .toBe("crashed");
  await page.keyboard.up("w");
  const crash = await state(page);
  expect(crash.joints).toBeLessThan(21);
  expect(crash.crashes).toBe(1);
  await expect(
    page.getByRole("heading", { name: "A ROUGH LANDING." }),
  ).toBeVisible();
  await page.screenshot({
    path: `screenshots/final/${info.project.name.split(" ")[0].toLowerCase()}-game-crash.png`,
  });
  await page.keyboard.press("r");
  await expect.poll(async () => (await state(page)).status).toBe("running");
  expect((await state(page)).joints).toBe(21);
  expect((await state(page)).input.accel).toBe(false);
});
test("full physical trail reaches all notebook checkpoints and finish", async ({
  page,
}, info) => {
  test.skip(
    !info.project.name.startsWith("Desktop"),
    "Long physical traversal runs once; controls/editor run at every viewport.",
  );
  test.setTimeout(100000);
  await enter(page);
  let lean = "",
    opened = false,
    capturedGap = false;
  const seen = new Set<number>();
  let last: any;
  const deadline = Date.now() + 85000;
  while (Date.now() < deadline) {
    const s = await state(page);
    last = s;
    seen.add(s.section);
    if (!capturedGap && s.x > 79 && s.x < 85 && !s.grounded) {
      await page.screenshot({
        path: "screenshots/final/desktop-game-airborne-gap.png",
      });
      capturedGap = true;
    }
    if (s.status === "finished") break;
    if (s.status === "crashed")
      throw new Error(`Unexpected crash at ${s.x}; angle ${s.angle}`);
    if (s.status === "checkpoint") {
      await page.keyboard.up("w");
      for (const k of ["a", "d"]) await page.keyboard.up(k);
      lean = "";
      if (!opened) {
        await page.screenshot({
          path: "screenshots/final/desktop-game-checkpoint.png",
        });
        await page
          .getByRole("button", { name: "Open project notebook", exact: true })
          .click();
        await expect(page.getByTestId("project-detail-modal")).toBeVisible();
        const stopped = await state(page);
        await page.waitForTimeout(250);
        expect((await state(page)).seconds).toBe(stopped.seconds);
        await page.keyboard.press("Escape");
        await expect(
          page.getByTestId("project-detail-modal"),
        ).not.toBeVisible();
        opened = true;
      }
      await page
        .getByRole("button", { name: "Continue riding", exact: false })
        .click();
      await page.locator("canvas").focus();
    }
    await page.keyboard.down("w");
    const control = (s.angle - (s.grounded ? 0 : 0.02)) * 2 + s.angular * 0.7,
      next = control < -0.15 ? "a" : control > 0.15 ? "d" : "";
    if (next !== lean) {
      if (lean) await page.keyboard.up(lean);
      if (next) await page.keyboard.down(next);
      lean = next;
    }
    await page.waitForTimeout(35);
  }
  await page.keyboard.up("w");
  if (lean) await page.keyboard.up(lean);
  expect(last.status).toBe("finished");
  expect(capturedGap).toBe(true);
  expect(seen.size).toBe(9);
  expect(last.stars).toBeGreaterThan(5);
  expect(last.maxAirborneTime).toBeGreaterThan(0.2);
  expect(last.checkpoint).toBe(8);
  await expect(
    page.getByRole("heading", { name: "WHAT A RIDE." }),
  ).toBeVisible();
  await page.screenshot({ path: "screenshots/final/game-finish.png" });
});
