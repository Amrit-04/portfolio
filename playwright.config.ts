import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 45000,
  expect: {
    timeout: 8000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [["list"], ["json", { outputFile: "docs/e2e-results.json" }]],
  use: {
    baseURL: "http://127.0.0.1:4173/portfolio/",
    channel: "chrome",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    reducedMotion: "reduce",
  },
  projects: [
    {
      name: "Desktop (1440x900)",
      use: {
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "Laptop (1366x768)",
      use: {
        viewport: { width: 1366, height: 768 },
      },
    },
    {
      name: "Mobile (390x844)",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: "npm run preview -- --strictPort",
    url: "http://127.0.0.1:4173/portfolio/",
    reuseExistingServer: true,
    timeout: 30000,
  },
});
