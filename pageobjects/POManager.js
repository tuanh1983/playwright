const { LoginPage } = require("./LoginPage");
const { ProductPage } = require("./ProductPage");
class POManager {
  constructor(page) {
    this.page = page;
    this.loingPage = new LoginPage(page);
    this.productPage = new ProductPage(page);
  }
  getLoginPage() {
    return this.loingPage;
  }
  getProductPage() {
    return this.productPage;
  }
}
module.exports = { POManager };
