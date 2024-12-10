const { test, expect, request } = require("@playwright/test");

const loginPayLoad = {
  userName: "0937213638",
  password: "123456789012",
  rememberMe: true,
};

let token;

test.beforeAll(async () => {
  const apiContext = await request.newContext();

  // Send the POST request and wait for the response
  const response = await apiContext.post(
    "https://identity.moon.vn/api/user/login",
    { data: loginPayLoad }
  );

  // Assert that the response was successful
  expect(response.ok()).toBeTruthy();

  // Parse the response as JSON
  const responseJson = await response.json();

  // Validate and log the desired property
  token = responseJson.token;
  console.log("Token:", token);

  // Send the second API request
  const response02 = await apiContext.get(
    "https://courseapi.moon.vn/api/Course/LessonDetail/19577961",
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  // Assert the second response is successful
  console.log(response02.statusText());
  expect(response02.ok()).toBeTruthy();

  // Parse and log the response as JSON
  const responseJson02 = await response02.json();

  // Log the desired property if it exists
  if (responseJson02.nameCourse) {
    console.log("Course Name:", responseJson02.nameCourse);
  } else {
    console.error(
      "Property 'nameCourse' is missing in the response:",
      responseJson02
    );
  }
  // Send the second API request
  const response03 = await apiContext.put(
    "https://shopapi.moon.vn/api/v3/shop/cart/create?productId=19750754&quantity=1&affId=",
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
});
//test.beforeEach(() => {});

//test01
test("Login Test", async ({ page }) => {
  test.setTimeout(360000); // Extend test timeout to 60 seconds

  console.log("Navigating to the sign-in page...");
  await page.goto("https://moon.vn/sign-in?");
  await page.waitForLoadState("networkidle"); // Wait for the page to load completely
  // Focus on the first input field by sending a Tab key
  await page.keyboard.press("Tab");
  // Wait for the input to be visible
  await page.waitForSelector(
    'flt-text-editing-host input[placeholder="Tài khoản hoặc số điện thoại"]',
    { state: "visible" }
  );

  // Fill in the input fields
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
