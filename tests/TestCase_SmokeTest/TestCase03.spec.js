const { test } = require("@playwright/test");
const { POManager } = require("../../pageobjects/POManager");
const loginData = require("../../data/loginData.json");
const testData = require("../../data/testDataTC01.json");

const userName = loginData.userName;
const password = loginData.password;

test.describe.configure({
  retries: 2,
  timeout: 120000, // Increased timeout to 120000ms (120 seconds)
  mode: "parallel",
  headless: false,
});

test("test", async ({ page }) => {
  await page.goto("https://eatools.miljoeportal.dk/landing");
  //await page.setViewportSize({ width: 1920, height: 1080 }); // Maximize the browser window
  await page.getByRole("link", { name: "Tillad alle" }).click();
  await page.getByRole("button", { name: "Begynd" }).click();
  await page.goto("https://eatools.miljoeportal.dk/report/geometry");
  // Ensure the page has loaded before interacting with elements
  await page.waitForLoadState("networkidle");
  await page.getByText("Lagvælger").click();
  await page.waitForLoadState("domcontentloaded");
  await page.locator(".spinner-border").waitFor({ state: "hidden" }); // Corrected method
  //<span data-v-64d07cfa="">Layer control</span>
  await page.getByText("Tegn punkt").click();
  await page
    .locator("canvas")
    .first()
    .click({
      position: {
        x: 197,
        y: 272,
      },
    });
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").press("ArrowLeft");
  await page.getByRole("textbox").fill("10");
  await page.locator(".execute-analysis-button").click();
  await page.waitForLoadState("domcontentloaded");
  await page.locator(".cancel-analyze").waitFor({ state: "hidden" }); // Corrected method
  await page
    .locator(
      "//div[@class='wizard-navigate']//button[contains(@class,'btn-save')]"
    )
    .first()
    .click();
  await page
    .locator("//div[@class='modal']//input[@class='form-control']")
    .first()
    .fill("Automation Test");
  await page
    .locator("//div[@class='modal']//input[@class='form-control']")
    .nth(1)
    .fill("tuanh_ti@yahoo.com");
  await page
    .locator(
      "//div[@class='modal']//button [@class='btn btn-primary me-1 btn btn-save']"
    )
    .click();
});
