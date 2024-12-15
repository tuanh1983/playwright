const { test, expect } = require("@playwright/test");
const { POManagerEATool } = require("../../pageobjects/POManagerEATool");
const loginData = require("../../data/loginData.json");
const testData = require("../../data/testDataTC01.json");
const { assert } = require("console");

const userName = loginData.userName;
const password = loginData.password;

test.describe.configure({
  retries: 2,
  timeout: 180000, // Increased timeout to 180000ms (180 seconds)
  mode: "parallel",
  headless: false, // Ensure the test runs in headless mode
});

test("test", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/drag_and_drop");
  // await page.locator("#column-a").click();
  // await page.locator("#column-b").click();
  await page.locator("#column-a").dragTo(page.locator("#column-b"));
  expect(await page.locator("#column-a").textContent()).toBe("B");
});
