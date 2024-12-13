const { myTest } = require("../../utils/BaseTestCase");
const { POManager } = require("../../pageobjects/POManager");
const loginData = require("../../data/loginData.json");
const testData = require("../../data/testDataTC01.json");

myTest(`Login Test 01`, async ({ page, testDataForOrder }) => {
  // Đăng nhập và lưu trạng thái
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.login(testDataForOrder.userName, testDataForOrder.password);
  await page.waitForLoadState("networkidle");
  const productPage = poManager.getProductPage();
  await productPage.searchProduct(testDataForOrder.searchProduct);
  await productPage.goToCart();
});
