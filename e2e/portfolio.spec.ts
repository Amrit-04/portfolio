import { test, expect } from "@playwright/test";
import { openNotebook } from "./paper-helpers";

test.describe("Portfolio Mode & Navigation", () => {
  test("loads portfolio mode with correct branding, navigation, and resume link", async ({
    page,
  }) => {
    await page.goto("./");
    await expect(page).toHaveTitle(/Amriteshkumar Yadav/i);

    await expect(page.locator("h1")).toHaveText("AMRITESHKUMAR YADAV");
    for (const id of ["about", "work", "links"]) {
      await expect(page.locator(`nav a[href="#${id}"]`)).toBeVisible();
    }
    await expect(page.locator('[data-testid^="category-"]')).toHaveCount(6);
    await page.getByTestId("category-research").click();

    // Verify verified resume download link
    const resumeLink = page.locator('[data-testid="resume-btn"]');
    await expect(resumeLink).toBeVisible();
    const resumeHref = await resumeLink.getAttribute("href");
    expect(resumeHref).toContain("Amriteshkumar_Yadav_.pdf");

    await page.keyboard.press("Escape");
    const found = new Set<string>();
    for (const category of ["ai", "systems", "quant", "algorithms"]) {
      await page.getByTestId(`category-${category}`).click();
      for (const id of await page
        .locator('[data-testid^="open-notebook-"]')
        .evaluateAll((nodes) =>
          nodes.map((n) => n.getAttribute("data-testid")!),
        ))
        found.add(id);
      await page.keyboard.press("Escape");
    }
    expect(found.size).toBe(7);
  });
});

test.describe("Interactive Project Demos", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("Demo 1: Neural Query Optimizer (WASM Inference & Parity)", async ({
    page,
  }) => {
    await openNotebook(page, "neural-query-optimizer");

    const modal = page.locator('[data-testid="project-detail-modal"]');
    await expect(modal).toBeVisible();

    // Verify Demo mounts
    const demo = page.locator('[data-testid="demo-neural-query-optimizer"]');
    await expect(demo).toBeVisible();

    // Verify prediction and actual execution metrics
    const prediction = page.locator('[data-testid="nqo-prediction"]');
    await prediction.scrollIntoViewIfNeeded();
    await expect(prediction).toBeVisible();
    await expect(prediction).not.toHaveText("—", { timeout: 10000 });
    await expect(demo).toHaveAttribute(
      "data-inference-mode",
      "model_inference",
    );
    await expect(demo).toContainText("Verified < 1e-4");

    // Verify operator tree is displayed
    const operatorTree = page.locator('[data-testid="nqo-operator-tree"]');
    await expect(operatorTree).toBeVisible();

    // Switch plan fixture
    const secondPlan = page.locator('[data-testid^="nqo-plan-"]').nth(1);
    const firstPrediction = await prediction.textContent();
    await secondPlan.click();
    await expect(prediction).not.toHaveText(firstPrediction!);
    await expect(demo).toContainText("Verified < 1e-4");

    // Close modal
    await page.locator('[data-testid="close-notebook-btn"]').click();
    await expect(modal).not.toBeVisible();
  });

  test("Demo 2: LRCP Trace Explorer (Waterfall & Filter Re-selection)", async ({
    page,
  }) => {
    await openNotebook(page, "llm-reliability-control-plane");

    const modal = page.locator('[data-testid="project-detail-modal"]');
    await expect(modal).toBeVisible();

    // Check waterfall and search input
    await expect(page.locator('[data-testid="lrcp-search"]')).toBeVisible();
    await expect(page.locator('[data-testid="lrcp-waterfall"]')).toBeVisible();

    // Switch filter to Redis Cache Hits
    await page.locator('[data-testid="lrcp-filter-HITS"]').click();
    await expect(page.locator('[data-testid="lrcp-waterfall"]')).toBeVisible();

    // Switch filter to Circuit-Breaker Events
    await page.locator('[data-testid="lrcp-filter-CIRCUIT_OPEN"]').click();
    await expect(page.locator('[data-testid="lrcp-waterfall"]')).toBeVisible();

    // Close modal
    await page.locator('[data-testid="close-notebook-btn"]').click();
    await expect(modal).not.toBeVisible();
  });

  test("Demo 3: Pipeline Replay (Real Sample Playback & 27 Tuning Sweeps)", async ({
    page,
  }) => {
    await openNotebook(page, "fault-tolerant-ml-telemetry");

    const modal = page.locator('[data-testid="project-detail-modal"]');
    await expect(modal).toBeVisible();

    // Scrubber slider and play button
    const scrubber = page.locator('[data-testid="replay-scrubber"]');
    await expect(scrubber).toBeVisible();

    const playBtn = page.locator('[data-testid="replay-play"]');
    await expect(playBtn).toBeVisible();
    await playBtn.click(); // Start playing
    await page.waitForTimeout(600);
    await playBtn.click(); // Pause

    // Check 12 partitions visualizer
    await expect(
      page.locator('[data-testid="replay-partitions"]'),
    ).toBeVisible();

    // Check tuning sweep tab
    await page.locator('[data-testid="replay-tab-tuning"]').click();
    const rows = page.locator("table tbody tr");
    await expect(rows).toHaveCount(27);

    // Check chaos tab
    await page.locator('[data-testid="replay-tab-chaos"]').click();
    await expect(page.locator("text=Zero-Loss Verified")).toBeVisible();

    // Close modal
    await page.locator('[data-testid="close-notebook-btn"]').click();
    await expect(modal).not.toBeVisible();
  });

  test("Demo 4: Tradeflow OMS (State Machine & Fill Accounting)", async ({
    page,
  }) => {
    await openNotebook(page, "tradeflow");

    const modal = page.locator('[data-testid="project-detail-modal"]');
    await expect(modal).toBeVisible();

    // Initial state: PendingNew
    const stateBadge = page.locator('[data-testid="tf-state"]');
    await expect(stateBadge).toHaveText("PendingNew");

    // Evaluate Risk -> State New
    await page.locator('[data-testid="tf-evaluate-risk"]').click();
    await expect(stateBadge).toHaveText("New");
    await expect(page.locator('[data-testid="tf-risk-result"]')).toBeVisible();

    // Partial fill 250 -> PartiallyFilled
    await page.locator('[data-testid="tf-partial-fill"]').click();
    await expect(stateBadge).toHaveText("PartiallyFilled");

    // Fill rest -> Filled
    await page.locator('[data-testid="tf-full-fill"]').click();
    await expect(stateBadge).toHaveText("Filled");

    // Reset order -> Fresh Order in PendingNew
    await page.locator('[data-testid="tf-reset"]').click();
    await expect(stateBadge).toHaveText("PendingNew");

    // Close modal
    await page.locator('[data-testid="close-notebook-btn"]').click();
    await expect(modal).not.toBeVisible();
  });

  test("Demo 5: Moneyball (Merton Compound Poisson Monte Carlo)", async ({
    page,
  }) => {
    await openNotebook(page, "moneyball");

    const modal = page.locator('[data-testid="project-detail-modal"]');
    await expect(modal).toBeVisible();

    // VaR and CVaR calculations
    const varMetrics = page.locator('[data-testid="mb-var"]');
    await expect(varMetrics).toBeVisible();
    await expect(varMetrics).toContainText(/95% VaR/i);
    await expect(varMetrics).toContainText(/99% VaR/i);
    await expect(varMetrics).toContainText(/99% CVaR/i);

    // Update Jump Intensity slider
    const jumpSlider = page.locator('[data-testid="mb-jump"]');
    await jumpSlider.fill("6");

    // Close modal
    await page.locator('[data-testid="close-notebook-btn"]').click();
    await expect(modal).not.toBeVisible();
  });

  test("Demo 6: Warehouse Routing (Obstacle-Aware A* & Open-Path Held-Karp)", async ({
    page,
  }) => {
    await openNotebook(page, "warehouse-routing-engine");

    const modal = page.locator('[data-testid="project-detail-modal"]');
    await expect(modal).toBeVisible();

    // Grid must be visible
    await expect(page.locator('[data-testid="wh-grid"]')).toBeVisible();

    // Click Solve Route
    await page.locator('[data-testid="wh-solve-btn"]').click();

    // Stats block must appear with distance and A* timing
    const stats = page.locator('[data-testid="wh-stats"]');
    await expect(stats).toBeVisible();
    await expect(stats).toContainText(/steps/i);
    await expect(stats).toContainText(/Held-Karp/i);

    // Reset button
    await page.locator('[data-testid="wh-reset-btn"]').click();
    await expect(stats).not.toBeVisible();

    // Close modal
    await page.locator('[data-testid="close-notebook-btn"]').click();
    await expect(modal).not.toBeVisible();
  });

  test("Demo 7: Workplace Safety (Geofencing & Foot-Point Probing)", async ({
    page,
  }) => {
    await openNotebook(page, "workplace-safety-vision");

    const modal = page.locator('[data-testid="project-detail-modal"]');
    await expect(modal).toBeVisible();

    // Canvas must mount
    await expect(page.locator('[data-testid="wsv-canvas"]')).toBeVisible();

    // Event log must be present
    const eventLog = page.locator('[data-testid="wsv-event-log"]');
    await expect(eventLog).toBeVisible();
    await expect(eventLog).toContainText(/synthetic/i);

    // Pause/Resume workers
    const playBtn = page.locator('[data-testid="wsv-play"]');
    await playBtn.click();
    await playBtn.click();

    // Close modal
    await page.locator('[data-testid="close-notebook-btn"]').click();
    await expect(modal).not.toBeVisible();
  });
});

// The rebuilt trail has its own behavioural suite in ride.spec.ts, including
// physical displacement, paused time, checkpoints, editor round-trip and input cleanup.
