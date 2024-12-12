const { test, expect } = require("@playwright/test");
test("visual test", async ({ page }) => {
  await page.goto("https://www.youtube.com/");
  expect(await page.screenshot()).toMatchSnapshot("youtube01.png");
});
