const { test, expect, request } = require("@playwright/test");
const ruleSetPayLoad = {
  paging: { skip: 0, take: 25, sortOrder: "asc" },
  filter: {},
};
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const response = await apiContext.post(
    "https://parameterlisten-api.miljoeportal.dk/rulesets/search",
    { data: ruleSetPayLoad }
  );

  expect(response.ok()).toBeTruthy();
  const responseJson = await response.json();
  console.log(responseJson.items[1].id);
});
test.beforeEach(() => {});

//test01
test.only("Browser First Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator("#username");
  const password = page.locator("#password");
  const singnIn = page.locator("#signInBtn");
  const card = page.locator(".card-body a");
});
