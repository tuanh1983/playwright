const { test } = require("@playwright/test");
const { POManager } = require("../../pageobjects/POManager");
const loginData = require("../../data/loginData.json");
const testData = require("../../data/testDataTC01.json");

const userName = loginData.userName;
const password = loginData.password;

test.describe.configure({
  retries: 2,
  timeout: 30000,
  mode: "parallel",
});

for (const data of testData) {
  test(`@smokeTest Login Test 01 ${data.searchProduct}`, async ({ page }) => {
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
