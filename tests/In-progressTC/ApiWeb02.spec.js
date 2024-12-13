const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../../utils/APIUtils");
const loginPayLoad = {
  userName: "0937213638",
  password: "123456789012",
  rememberMe: true,
};

let token;

test.beforeAll(async () => {
  const apiContex = await request.newContext();
  const apiUtils = new APIUtils(apiContex, loginPayLoad);
  //apiUtils.getToken();
  apiUtils.viewCourse();
  apiUtils.createOrder();
});
test("Login Test", async ({ page }) => {
  /*test.setTimeout(360000); // Extend test timeout to 60 seconds
  await page.goto("https://moon.vn/sign-in");
  await page.locator("flutter-view").click();

  await page
    .getByPlaceholder("Tài khoản hoặc số điện thoại")
    .fill("0937213638");
  await page.getByPlaceholder("Mật khẩu").fill("123456789012");
  await page.getByPlaceholder("Mật khẩu").press("Enter");
  await page.goto("https://moon.vn/tab-shopping-page", {
    waitUntil: "networkidle",
  });

  // Optional: Wait for a specific element
  await page.waitForSelector(".shopping-page-content", { state: "visible" });*/
});
