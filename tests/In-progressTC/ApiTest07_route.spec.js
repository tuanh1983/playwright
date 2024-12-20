const { test, expect } = require("@playwright/test");
let webContext;
const fakePayload = { data: [], message: "No Product in Cart" };
test.beforeAll(async ({ browser }) => {
  // Đăng nhập và lưu trạng thái
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("rahulshetty@gmail.com");
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  // Tạo webContext từ trạng thái đã lưu
  webContext = await browser.newContext({ storageState: "state.json" });
});
test("Login Test 01", async () => {
  const productName = "iphone 13 pro";

  // Kiểm tra xem webContext đã được khởi tạo chưa
  if (!webContext) {
    throw new Error("webContext is not initialized");
  }

  // Sử dụng webContext để mở trang
  const page = await webContext.newPage();
  page.route("**/*.{jpg,png,jpeg}", (route) => route.abort());
  await page.goto("https://rahulshettyacademy.com/client");

  // Xử lý sản phẩm
  const products = page.locator(".card-body");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      // Thêm vào giỏ hàng
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
});

test("Test Route", async () => {
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/user/get-cart-count/*",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = fakePayload;
      route.fulfill({
        body,
        response,
        body: JSON.stringify(body),
      });
    }
  );

  await page.locator("//button[@routerlink='/dashboard/myorders']").click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/user/get-cart-count/*"
  );
  console.log(await page.locator(".mt-4").textContent());
});
