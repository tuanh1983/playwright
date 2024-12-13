// @ts-check
const { defineConfig, devices } = require("@playwright/test");
module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  use: {
    //trace: "on-first-retry",
    browserName: "chromium",
    //video: "on",
    headless: true,
    screenshot: "on",
    trace: "off",
    projects: [
      {
        name: "Mobile Safari",
        use: {
          ...devices["iPhone 13"],
        },
      },
      {
        name: "chromium",
        use: {
          ...devices["Desktop Chrome"],
        },
      },
    ],
  },
});
