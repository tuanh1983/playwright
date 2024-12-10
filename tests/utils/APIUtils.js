class APIUtils {
  constructor(apiContex, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }
  async getToken() {
    // Send the POST request and wait for the response
    const response = await apiContext.post(
      "https://identity.moon.vn/api/user/login",
      { data: this.loginPayLoad }
    );

    // Assert that the response was successful
    expect(response.ok()).toBeTruthy();

    // Parse the response as JSON
    const responseJson = await response.json();

    // Validate and log the desired property
    token = responseJson.token;
    console.log("Token:", token);
  }
  async createorder() {
    // Send the second API request
    const response03 = await apiContext.put(
      "https://shopapi.moon.vn/api/v3/shop/cart/create?productId=19750754&quantity=1&affId=",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  }
  async viewCourse() {
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
  }
}
module.exports = { APIUtils };
