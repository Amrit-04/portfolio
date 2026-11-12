import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const OUT_DIR = path.resolve('screenshots/revision-2');
const ARTIFACT_DIR = path.resolve('C:/Users/amrit/.gemini/antigravity/brain/5f723586-b7ce-4cf3-98bf-8f3415f7b202');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      // wait a bit
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server did not respond at ${url} within ${timeoutMs}ms`);
}

async function run() {
  const BASE_URL = 'http://127.0.0.1:4173/portfolio/';
  let serverProcess = null;

  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Not running');
    console.log('Preview server already listening.');
  } catch {
    console.log('Starting preview server on port 4173...');
    serverProcess = spawn('npm.cmd', ['run', 'preview'], {
      shell: true,
      stdio: 'pipe',
    });
    serverProcess.stdout.on('data', (d) => process.stdout.write(d));
    serverProcess.stderr.on('data', (d) => process.stderr.write(d));
    await waitForServer(BASE_URL);
    console.log('Preview server ready!');
  }

  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  console.log('Capturing Desktop Viewports (1440x900)...');
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto(BASE_URL, { waitUntil: 'networkidle' });
  await desktop.waitForTimeout(1000);

  // 1. Hero
  const heroPath = path.join(OUT_DIR, '01_portfolio_hero_desktop.png');
  await desktop.screenshot({ path: heroPath });
  fs.copyFileSync(heroPath, path.join(ARTIFACT_DIR, '01_portfolio_hero_desktop.png'));
  console.log('Saved 01_portfolio_hero_desktop.png');

  // 2. Work Exhibits
  await desktop.evaluate(() => document.querySelector('#work')?.scrollIntoView({ behavior: 'instant' }));
  await desktop.waitForTimeout(600);
  const workPath = path.join(OUT_DIR, '02_portfolio_work_exhibits_desktop.png');
  await desktop.screenshot({ path: workPath });
  fs.copyFileSync(workPath, path.join(ARTIFACT_DIR, '02_portfolio_work_exhibits_desktop.png'));
  console.log('Saved 02_portfolio_work_exhibits_desktop.png');

  // 3. About
  await desktop.evaluate(() => document.querySelector('#about')?.scrollIntoView({ behavior: 'instant' }));
  await desktop.waitForTimeout(600);
  const aboutPath = path.join(OUT_DIR, '03_portfolio_about_desktop.png');
  await desktop.screenshot({ path: aboutPath });
  fs.copyFileSync(aboutPath, path.join(ARTIFACT_DIR, '03_portfolio_about_desktop.png'));
  console.log('Saved 03_portfolio_about_desktop.png');

  // 4. Skills
  await desktop.evaluate(() => document.querySelector('#skills')?.scrollIntoView({ behavior: 'instant' }));
  await desktop.waitForTimeout(600);
  const skillsPath = path.join(OUT_DIR, '04_portfolio_skills_desktop.png');
  await desktop.screenshot({ path: skillsPath });
  fs.copyFileSync(skillsPath, path.join(ARTIFACT_DIR, '04_portfolio_skills_desktop.png'));
  console.log('Saved 04_portfolio_skills_desktop.png');

  // 5. Research
  await desktop.evaluate(() => document.querySelector('#research')?.scrollIntoView({ behavior: 'instant' }));
  await desktop.waitForTimeout(600);
  const resPath = path.join(OUT_DIR, '05_portfolio_research_desktop.png');
  await desktop.screenshot({ path: resPath });
  fs.copyFileSync(resPath, path.join(ARTIFACT_DIR, '05_portfolio_research_desktop.png'));
  console.log('Saved 05_portfolio_research_desktop.png');

  // 6. Contact
  await desktop.evaluate(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'instant' }));
  await desktop.waitForTimeout(600);
  const contactPath = path.join(OUT_DIR, '06_portfolio_contact_desktop.png');
  await desktop.screenshot({ path: contactPath });
  fs.copyFileSync(contactPath, path.join(ARTIFACT_DIR, '06_portfolio_contact_desktop.png'));
  console.log('Saved 06_portfolio_contact_desktop.png');

  // 7. Project Detail Modal
  await desktop.evaluate(() => document.querySelector('#work')?.scrollIntoView({ behavior: 'instant' }));
  await desktop.waitForTimeout(400);
  await desktop.locator('[data-testid="open-notebook-neural-query-optimizer"]').click();
  await desktop.waitForSelector('[data-testid="project-detail-modal"]');
  await desktop.waitForTimeout(1000);
  const modalPath = path.join(OUT_DIR, '07_project_detail_modal_desktop.png');
  await desktop.screenshot({ path: modalPath });
  fs.copyFileSync(modalPath, path.join(ARTIFACT_DIR, '07_project_detail_modal_desktop.png'));
  console.log('Saved 07_project_detail_modal_desktop.png');
  await desktop.locator('[data-testid="close-notebook-btn"]').click();
  await desktop.waitForTimeout(400);

  // 8. Ride Mode Starting Scene
  await desktop.evaluate(() => window.scrollTo(0, 0));
  await desktop.locator('[data-testid="enter-track-btn"]').click();
  await desktop.waitForSelector('[data-testid="ride-mode"]');
  await desktop.waitForTimeout(1200);
  const rideStartPath = path.join(OUT_DIR, '08_ride_mode_starting_scene.png');
  await desktop.screenshot({ path: rideStartPath });
  fs.copyFileSync(rideStartPath, path.join(ARTIFACT_DIR, '08_ride_mode_starting_scene.png'));
  console.log('Saved 08_ride_mode_starting_scene.png');

  // 9. Ride Mode in Motion (accelerate over gap)
  await desktop.keyboard.down('ArrowUp');
  await desktop.waitForTimeout(1200);
  await desktop.keyboard.up('ArrowUp');
  await desktop.waitForTimeout(300);
  const rideMotionPath = path.join(OUT_DIR, '09_ride_mode_in_motion.png');
  await desktop.screenshot({ path: rideMotionPath });
  fs.copyFileSync(rideMotionPath, path.join(ARTIFACT_DIR, '09_ride_mode_in_motion.png'));
  console.log('Saved 09_ride_mode_in_motion.png');

  // 10. Ride Mode Track Editor
  await desktop.locator('[data-testid="hud-editor-btn"]').click();
  await desktop.waitForSelector('[data-testid="track-editor-toolbar"]');
  const canvas = desktop.locator('[data-testid="ride-canvas"]');
  const box = await canvas.boundingBox();
  if (box) {
    await desktop.mouse.move(box.x + box.width * 0.45, box.y + box.height * 0.58);
    await desktop.mouse.down();
    await desktop.mouse.move(box.x + box.width * 0.55, box.y + box.height * 0.45, { steps: 8 });
    await desktop.mouse.up();
  }
  await desktop.waitForTimeout(500);
  const editorPath = path.join(OUT_DIR, '10_ride_mode_track_editor.png');
  await desktop.screenshot({ path: editorPath });
  fs.copyFileSync(editorPath, path.join(ARTIFACT_DIR, '10_ride_mode_track_editor.png'));
  console.log('Saved 10_ride_mode_track_editor.png');
  await desktop.close();

  // 11. Laptop Viewport (1366x768)
  console.log('Capturing Laptop (1366x768)...');
  const laptop = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  await laptop.goto(BASE_URL, { waitUntil: 'networkidle' });
  await laptop.waitForTimeout(800);
  const laptopPath = path.join(OUT_DIR, '11_portfolio_laptop_1366x768.png');
  await laptop.screenshot({ path: laptopPath });
  fs.copyFileSync(laptopPath, path.join(ARTIFACT_DIR, '11_portfolio_laptop_1366x768.png'));
  console.log('Saved 11_portfolio_laptop_1366x768.png');
  await laptop.close();

  // 12. Mobile Viewport (390x844)
  console.log('Capturing Mobile (390x844)...');
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await mobile.goto(BASE_URL, { waitUntil: 'networkidle' });
  await mobile.waitForTimeout(800);
  const mobilePath = path.join(OUT_DIR, '12_portfolio_mobile_390x844.png');
  await mobile.screenshot({ path: mobilePath });
  fs.copyFileSync(mobilePath, path.join(ARTIFACT_DIR, '12_portfolio_mobile_390x844.png'));
  console.log('Saved 12_portfolio_mobile_390x844.png');

  // 13. Mobile Ride Mode with touch controls
  await mobile.locator('[data-testid="enter-track-nav"]').click();
  await mobile.waitForSelector('[data-testid="touch-controls"]');
  await mobile.waitForTimeout(800);
  const mobileRidePath = path.join(OUT_DIR, '13_ride_mode_mobile_touch.png');
  await mobile.screenshot({ path: mobileRidePath });
  fs.copyFileSync(mobileRidePath, path.join(ARTIFACT_DIR, '13_ride_mode_mobile_touch.png'));
  console.log('Saved 13_ride_mode_mobile_touch.png');
  await mobile.close();

  await browser.close();

  if (serverProcess) {
    serverProcess.kill('SIGTERM');
  }

  console.log('All 13 revision-2 screenshots captured successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
