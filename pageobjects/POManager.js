require("./LoginPage");
require("./ProductPage");
class POManager {
  constructor(page) {
    this.page = page;
    this.loingPage = new LoginPage();
    this.PrtoductPage = new ProductPage();
  }
  getLoginPage() {
    return this.loingPage;
  }
  getProductPage() {
    return this.PrtoductPage;
  }
}
module.exports = { POManager };
