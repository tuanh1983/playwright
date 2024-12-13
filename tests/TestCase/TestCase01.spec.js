const { test, expect } = require("@playwright/test");
const { POManager } = require("../../pageobjects/POManager");
const loginData = require("../../data/loginData.json");
const testData = require("../../data/testDataTC01.json");
let webContext;
const fakePayload = { data: [], message: "No Product in Cart" };
const userName = loginData.userName;
const password = loginData.password;
const searchProduct = testData.searchProduct;
test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  const context = await browser.newContext();
  // Đăng nhập và lưu trạng thái
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.login(userName, password);
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  // Tạo webContext từ trạng thái đã lưu
  webContext = await browser.newContext({ storageState: "state.json" });
  const productPage = poManager.getProductPage();
  await productPage.searchProduct(searchProduct);
  await productPage.goToCart();
});
test("Login Test 01", async () => {});
