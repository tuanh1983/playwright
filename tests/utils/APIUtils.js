class APIUtils {
  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
    this.token = null; // Khởi tạo token trong phạm vi class
  }

  async getToken() {
    console.log("NDTA Start:", this.loginPayLoad);

    // Gửi yêu cầu POST để lấy token
    const response = await this.apiContext.post(
      "https://identity.moon.vn/api/user/login",
      { data: this.loginPayLoad }
    );

    // Phân tích kết quả JSON và lưu token
    const responseJson = await response.json();
    this.token = responseJson.token; // Lưu token trong class
    console.log("NDTA Token:", this.token);
    return this.token;
  }

  async createOrder() {
    // Kiểm tra và lấy token nếu chưa có
    if (!this.token) {
      await this.getToken();
    }

    // Gửi yêu cầu PUT để tạo đơn hàng
    const response = await this.apiContext.put(
      "https://shopapi.moon.vn/api/v3/shop/cart/create?productId=19750754&quantity=1&affId=",
      {
        headers: {
          authorization: `Bearer ${this.token}`, // Sử dụng token đã lưu
        },
      }
    );

    // Kiểm tra kết quả
    console.log("Order creation status:", response.statusText());
    return response.ok();
  }

  async viewCourse() {
    // Kiểm tra và lấy token nếu chưa có
    if (!this.token) {
      await this.getToken();
    }

    // Gửi yêu cầu GET để xem chi tiết khóa học
    const response = await this.apiContext.get(
      "https://courseapi.moon.vn/api/Course/LessonDetail/19577961",
      {
        headers: {
          authorization: `Bearer ${this.token}`, // Sử dụng token đã lưu
        },
      }
    );

    // Kiểm tra kết quả
    console.log("View Course status:", response.statusText());

    // Phân tích kết quả JSON
    const responseJson = await response.json();

    // Log thông tin khóa học
    if (responseJson.nameCourse) {
      console.log("Course Name:", responseJson.nameCourse);
    } else {
      console.error(
        "Property 'nameCourse' is missing in the response:",
        responseJson
      );
    }
  }
}

module.exports = { APIUtils };
