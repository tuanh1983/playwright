const { test, expect } = require("@playwright/test");
const { loginPage } = require("../pageobjects/LoginPage");
const { log } = require("console");
let webContext;
const fakePayload = { data: [], message: "No Product in Cart" };
test.beforeAll(async ({ browser }) => {
  // Đăng nhập và lưu trạng thái
  const context = await browser.newContext();
  const page = await context.newPage();

  loginPage = new LoginPage(page);
  loginPage.goTo();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  // Tạo webContext từ trạng thái đã lưu
  webContext = await browser.newContext({ storageState: "state.json" });
});
test("Login Test 01", async () => {});
