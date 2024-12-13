const { test, expect } = require("@playwright/test");
const { POManager } = require("../../pageobjects/POManager");
const loginData = require("../../data/loginData.json");
const testData = require("../../data/testDataTC01.json");
let webContext;
const fakePayload = { data: [], message: "No Product in Cart" };
const userName = loginData.userName;
const password = loginData.password;
const searchProduct = testData.searchProduct;

for (const data of testData) {
  test(`Login Test 01 ${data.searchProduct}`, async ({ page }) => {
    // Đăng nhập và lưu trạng thái
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.login(userName, password);
    await page.waitForLoadState("networkidle");
    const productPage = poManager.getProductPage();
    await productPage.searchProduct(data.searchProduct);
    await productPage.goToCart();
  });
}
