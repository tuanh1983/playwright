const { test, expect } = require("@playwright/test");
test.only("Browser First Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator("#username");
  const password = page.locator("#password");
  const singnIn = page.locator("#signInBtn");
  const card = page.locator(".card-body a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(page.title);
  await username.fill("rahulshetty");
  await password.fill("learning");
  await singnIn.click();
  await page.locator("[style*='block']").textContent();
  await expect(page.locator("[style*='block']")).toContainText(
    "Incorrect username/password."
  );
  await username.fill("rahulshettyacademy");
  await password.fill("learning");
  await singnIn.click();
  //await page.waitForLoadState("networkidle");
  console.log(await card.first().waitFor());
  console.log(await card.allTextContents());
});
test("Page First Test", async ({ page }) => {
  await page.goto("https://eatools.test.miljoeportal.dk/landing");
});
