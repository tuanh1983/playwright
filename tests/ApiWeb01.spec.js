const { test, expect, request } = require("@playwright/test");

const loginPayLoad = {
  userName: "0937213638",
  password: "123456789012",
  rememberMe: true,
};

let token;
test.describe("API and Web Tests", () => {
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
    await page.waitForSelector(".shopping-page-content", { state: "visible" });
  });
});
