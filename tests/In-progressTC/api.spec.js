const { test, expect, request } = require("@playwright/test");
const ruleSetPayLoad = {
  paging: { skip: 0, take: 25, sortOrder: "asc" },
  filter: {},
};
test.beforeAll(async () => {
  const apiContext = await request.newContext();

  // Send the POST request and wait for the response
  const response = await apiContext.post(
    "https://parameterlisten-api.miljoeportal.dk/rulesets/search",
    { data: ruleSetPayLoad }
  );

  // Assert that the response was successful
  expect(response.ok()).toBeTruthy();

  // Parse the response as JSON
  const responseJson = await response.json();

  // Validate and log the desired property
  if (
    responseJson.items &&
    Array.isArray(responseJson.items) &&
    responseJson.items.length > 1
  ) {
    console.log(responseJson.items[1].id);
  } else {
    console.error(
      "The items array is missing, not an array, or has fewer than 2 elements."
    );
  }
});
//test.beforeEach(() => {});

//test01
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
