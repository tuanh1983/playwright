const { LandingPage } = require("./LandingPage"); // Corrected import statement
const { AnalasyPage } = require("./AnalasyPage");
class POManagerEATool {
  constructor(page) {
    this.page = page;
    this.landingPage = new LandingPage(page);
    this.analasyPage = new AnalasyPage(page);
  }
  getLandingPage() {
    return this.landingPage;
  }
  getAnalasyPage() {
    return this.analasyPage;
  }
}
module.exports = { POManagerEATool };
