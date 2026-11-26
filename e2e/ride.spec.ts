import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

type GameTrack = {
  time: number;
  playerRunner: {
    instance: { hitbox: { pos: { x: number; y: number } } };
    snapshots: unknown[];
    hitCheckpoint(checkpoint: { id: number }): void;
    mustSave: boolean;
    save(): void;
  };
  reachables: Map<number, { id: number }>;
};

type DebugWindow = Window & {
  __game?: { track: GameTrack | null };
};

const startGame = async (page: Page) => {
  await page.goto("./openrider/index.html");
  await page.keyboard.press("Enter");
  await expect(page.locator("#restartMap")).toBeEnabled();
};

const bikePosition = (page: Page) =>
  page.evaluate(() => {
    const track = (window as DebugWindow).__game?.track;
    if (!track) throw new Error("OpenRider has not started.");
    const { x, y } = track.playerRunner.instance.hitbox.pos;
    return { x, y };
  });

test("legacy ride URL and Playground launch open Rampage", async ({ page }) => {
  await page.goto("./#/ride");
  await expect(page).toHaveURL(/\/portfolio\/openrider\/index\.html$/);
  await expect(page).toHaveTitle("Red Bull Rampage | OpenRider");
  await expect(
    page.getByRole("heading", { name: "RED BULL RAMPAGE" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "← Portfolio", exact: true }).click();
  await page.getByTestId("category-playground").click();
  await page.getByTestId("enter-track-nav").click();
  await expect(page).toHaveURL(/\/portfolio\/openrider\/index\.html$/);
  await expect(page.locator("#restartMap")).toBeDisabled();
});

test("restart map returns the bike to the start", async ({ page }) => {
  await startGame(page);
  const start = await bikePosition(page);

  await page.keyboard.down("w");
  await expect
    .poll(async () => Number(await page.locator("#hudSpeed").textContent()))
    .toBeGreaterThan(0);
  await page.keyboard.up("w");

  await page.locator("#restartMap").click();
  await expect
    .poll(async () => Number(await page.locator("#hudTime").textContent()))
    .toBeLessThan(0.5);
  const restarted = await bikePosition(page);
  expect(Math.hypot(restarted.x - start.x, restarted.y - start.y)).toBeLessThan(
    1,
  );
  await expect(page.locator("#previousCheckpoint")).toBeDisabled();
});

test("previous checkpoint rolls back one checkpoint and Shift+R restarts", async ({
  page,
}) => {
  await startGame(page);
  await page.evaluate(() => {
    const track = (window as DebugWindow).__game?.track;
    if (!track) throw new Error("OpenRider has not started.");
    const runner = track.playerRunner;
    const [firstCheckpoint, secondCheckpoint] = track.reachables.values();
    if (!firstCheckpoint || !secondCheckpoint) {
      throw new Error("Rampage checkpoints are missing.");
    }

    track.time = 200;
    runner.hitCheckpoint(firstCheckpoint);
    runner.mustSave = false;
    runner.save();

    track.time = 800;
    runner.hitCheckpoint(secondCheckpoint);
    runner.mustSave = false;
    runner.save();
  });

  const previousCheckpoint = page.locator("#previousCheckpoint");
  await expect(previousCheckpoint).toBeEnabled();
  await previousCheckpoint.click();
  await expect
    .poll(async () => Number(await page.locator("#hudTime").textContent()))
    .toBeLessThan(8);
  await expect(previousCheckpoint).toBeEnabled();

  await page.keyboard.press("Shift+r");
  await expect
    .poll(async () => Number(await page.locator("#hudTime").textContent()))
    .toBeLessThan(0.5);
  await expect(previousCheckpoint).toBeDisabled();
});
