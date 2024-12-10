// @ts-check
const { defineConfig, devices } = require("@playwright/test");
module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  use: {
    trace: "on-first-retry",
    browserName: "chromium",
    headless: false,
    screenshot: "on",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
