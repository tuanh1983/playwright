const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageobjects/POManager");
let webContext;
const fakePayload = { data: [], message: "No Product in Cart" };
const userName = "rahulshetty@gmail.com";
const password = "Iamking@000";
const searchProduct = "ZARA COAT 3";

test.beforeAll(async ({ browser }) => {
  // Đăng nhập và lưu trạng thái
  const page = await browser.newPage();
  const context = await browser.newContext();
  const poManager = new POManager(page);
  const loginPage = new poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.login(userName, password);
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  // Tạo webContext từ trạng thái đã lưu
  webContext = await browser.newContext({ storageState: "state.json" });
  const productPage = new poManager.getProductPage();
  await productPage.searchProduct(searchProduct);
  await productPage.goToCart();
});
test("Login Test 01", async () => {});
