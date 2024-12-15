const { test } = require("@playwright/test");

test("Login Test", async ({ page }) => {
  test.setTimeout(360000); // Extend test timeout to 60 seconds

  console.log("Navigating to the sign-in page...");
  await page.goto("https://moon.vn/sign-in?");
  await page.waitForLoadState("networkidle");
  await page.keyboard.press("Tab");
  await page.waitForSelector(
    'flt-text-editing-host input[placeholder="Tài khoản hoặc số điện thoại"]',
    { state: "visible" }
  );

  const userName = await page.locator(
    'flt-text-editing-host input[placeholder="Tài khoản hoặc số điện thoại"]'
  );
  await userName.fill("0937213638");
  await page.keyboard.press("Tab");
  const password = await page.locator(
    'flt-text-editing-host input[placeholder="Mật khẩu"]'
  );
  await password.fill("123456789012");
  await password.press("Enter");
  await page.waitForTimeout(5000);
  await page.goto("https://moon.vn/tab-shopping-page", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(5000);
});
