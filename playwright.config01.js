const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  reporter: "html",
  use: {
    headless: true,

    screenshot: "on",
    trace: "off",
  },
  projects: [
    {
      name: "Safari",
      use: {
        browserName: "webkit", // Playwright uses 'webkit' for Safari
        headless: false,
        ...devices["iPhone 11"], // Use the predefined device for Desktop Safari
      },
    },
    {
      name: "webkit",
      use: {
        browserName: "webkit", // Playwright uses 'webkit' for Safari
        ...devices["Desktop Safari"], // Use the predefined device for Desktop Safari
      },
    },
  ],
});
