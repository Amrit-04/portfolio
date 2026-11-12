import { test, expect } from '@playwright/test';

test.describe('Portfolio Mode & Navigation', () => {
  test('loads portfolio mode with correct branding, navigation, and resume link', async ({ page }) => {
    await page.goto('./');
    await expect(page).toHaveTitle(/Amriteshkumar Yadav/i);

    // Verify Hero and Sections
    const heroHeadline = page.locator('h1');
    await expect(heroHeadline).toBeVisible();
    await expect(heroHeadline).toContainText(/scale/i);

    // Navigation links (desktop navbar vs mobile navbar)
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 768) {
      await expect(page.locator('a[href="#work"]')).toBeVisible();
      await expect(page.locator('a[href="#about"]')).toBeVisible();
      await expect(page.locator('a[href="#skills"]')).toBeVisible();
      await expect(page.locator('a[href="#contact"]')).toBeVisible();
    } else {
      await expect(page.locator('[data-testid="enter-track-nav"]')).toBeVisible();
      await expect(page.locator('[data-testid="nav-home"]')).toBeVisible();
    }

    // Verify verified resume download link
    const resumeLink = page.locator('[data-testid="resume-btn"]');
    await expect(resumeLink).toBeVisible();
    const resumeHref = await resumeLink.getAttribute('href');
    expect(resumeHref).toContain('Amriteshkumar_Yadav_.pdf');

    // Verify all 7 distinct project exhibits
    const projectCards = page.locator('[data-testid^="project-card-"]');
    await expect(projectCards).toHaveCount(7);
  });
});

test.describe('Interactive Project Demos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
  });

  test('Demo 1: Neural Query Optimizer (WASM Inference & Parity)', async ({ page }) => {
    const card = page.locator('[data-testid="project-card-neural-query-optimizer"]');
    await card.scrollIntoViewIfNeeded();
    await page.locator('[data-testid="open-notebook-neural-query-optimizer"]').click();

    const modal = page.locator('[data-testid="project-detail-modal"]');
    await expect(modal).toBeVisible();

    // Verify Demo mounts
    const demo = page.locator('[data-testid="demo-neural-query-optimizer"]');
    await expect(demo).toBeVisible();

    // Verify prediction and actual execution metrics
    const prediction = page.locator('[data-testid="nqo-prediction"]');
    await expect(prediction).toBeVisible();
    await expect(prediction).not.toHaveText('—', { timeout: 10000 });

    // Verify operator tree is displayed
    const operatorTree = page.locator('[data-testid="nqo-operator-tree"]');
    await expect(operatorTree).toBeVisible();

    // Switch plan fixture
    const secondPlan = page.locator('[data-testid^="nqo-plan-"]').nth(1);
    await secondPlan.click();
    await expect(prediction).toBeVisible();

    // Close modal
    await page.locator('[data-testid="close-notebook-btn"]').click();
    await expect(modal).not.toBeVisible();
  });

  test('Demo 2: LRCP Trace Explorer (Waterfall & Filter Re-selection)', async ({ page }) => {
    const card = page.locator('[data-testid="project-card-llm-reliability-control-plane"]');
    await card.scrollIntoViewIfNeeded();
    await page.locator('[data-testid="open-notebook-llm-reliability-control-plane"]').click();

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

  test('Demo 3: Pipeline Replay (Real Sample Playback & 27 Tuning Sweeps)', async ({ page }) => {
    const card = page.locator('[data-testid="project-card-fault-tolerant-ml-telemetry"]');
    await card.scrollIntoViewIfNeeded();
    await page.locator('[data-testid="open-notebook-fault-tolerant-ml-telemetry"]').click();

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
    await expect(page.locator('[data-testid="replay-partitions"]')).toBeVisible();

    // Check tuning sweep tab
    await page.locator('[data-testid="replay-tab-tuning"]').click();
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(27);

    // Check chaos tab
    await page.locator('[data-testid="replay-tab-chaos"]').click();
    await expect(page.locator('text=Zero-Loss Verified')).toBeVisible();

    // Close modal
    await page.locator('[data-testid="close-notebook-btn"]').click();
    await expect(modal).not.toBeVisible();
  });

  test('Demo 4: Tradeflow OMS (State Machine & Fill Accounting)', async ({ page }) => {
    const card = page.locator('[data-testid="project-card-tradeflow"]');
    await card.scrollIntoViewIfNeeded();
    await page.locator('[data-testid="open-notebook-tradeflow"]').click();

    const modal = page.locator('[data-testid="project-detail-modal"]');
    await expect(modal).toBeVisible();

    // Initial state: PendingNew
    const stateBadge = page.locator('[data-testid="tf-state"]');
    await expect(stateBadge).toHaveText('PendingNew');

    // Evaluate Risk -> State New
    await page.locator('[data-testid="tf-evaluate-risk"]').click();
    await expect(stateBadge).toHaveText('New');
    await expect(page.locator('[data-testid="tf-risk-result"]')).toBeVisible();

    // Partial fill 250 -> PartiallyFilled
    await page.locator('[data-testid="tf-partial-fill"]').click();
    await expect(stateBadge).toHaveText('PartiallyFilled');

    // Fill rest -> Filled
    await page.locator('[data-testid="tf-full-fill"]').click();
    await expect(stateBadge).toHaveText('Filled');

    // Reset order -> Fresh Order in PendingNew
    await page.locator('[data-testid="tf-reset"]').click();
    await expect(stateBadge).toHaveText('PendingNew');

    // Close modal
    await page.locator('[data-testid="close-notebook-btn"]').click();
    await expect(modal).not.toBeVisible();
  });

  test('Demo 5: Moneyball (Merton Compound Poisson Monte Carlo)', async ({ page }) => {
    const card = page.locator('[data-testid="project-card-moneyball"]');
    await card.scrollIntoViewIfNeeded();
    await page.locator('[data-testid="open-notebook-moneyball"]').click();

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
    await jumpSlider.fill('6');

    // Close modal
    await page.locator('[data-testid="close-notebook-btn"]').click();
    await expect(modal).not.toBeVisible();
  });

  test('Demo 6: Warehouse Routing (Obstacle-Aware A* & Open-Path Held-Karp)', async ({ page }) => {
    const card = page.locator('[data-testid="project-card-warehouse-routing-engine"]');
    await card.scrollIntoViewIfNeeded();
    await page.locator('[data-testid="open-notebook-warehouse-routing-engine"]').click();

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

  test('Demo 7: Workplace Safety (Geofencing & Foot-Point Probing)', async ({ page }) => {
    const card = page.locator('[data-testid="project-card-workplace-safety-vision"]');
    await card.scrollIntoViewIfNeeded();
    await page.locator('[data-testid="open-notebook-workplace-safety-vision"]').click();

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

test.describe('Ride Mode (Free Rider Physics & Checkpoints)', () => {
  test('enters Ride Mode, controls bike, triggers checkpoints, and exits', async ({ page }) => {
    await page.goto('./');

    // Click Enter the Track
    const enterBtn = page.locator('[data-testid="enter-track-btn"]');
    await enterBtn.click();

    // Verify Ride Mode container and Canvas mount
    const rideMode = page.locator('[data-testid="ride-mode"]');
    await expect(rideMode).toBeVisible();

    const canvas = page.locator('[data-testid="ride-canvas"]');
    await expect(canvas).toBeVisible();

    // Verify HUD section badge
    const hud = page.locator('[data-testid="hud-section"]');
    await expect(hud).toBeVisible();

    // Send physics inputs (ArrowUp to accelerate forward smoothly without flipping)
    await page.keyboard.down('ArrowUp');
    await page.waitForTimeout(300);
    await page.keyboard.up('ArrowUp');

    // Test pause toggle via HUD pause button
    const pauseBtn = page.locator('[data-testid="hud-pause-btn"]');
    await pauseBtn.click();
    await expect(page.locator('[data-testid="pause-overlay"]')).toBeVisible();
    await page.locator('[data-testid="pause-resume-btn"]').click();
    await expect(page.locator('[data-testid="pause-overlay"]')).not.toBeVisible();

    // Test Exit to Portfolio mode via HUD exit button
    await page.locator('[data-testid="hud-exit-btn"]').click();
    await expect(rideMode).not.toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
  });
});
