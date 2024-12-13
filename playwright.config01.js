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
    //trace: "on-first-retry",
    browserName: "webkit",
    headless: false,
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
