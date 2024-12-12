class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.loginButton = page.locator("[value='Login']");
  }
  async login(username, password) {
    await this.username.type(username);
    await this.password.type(password);
    await this.loginButton.click();
  }
  goTo() {
    this.page.goto("https://rahulshettyacademy.com/client");
  }
}
module.exports = { LoginPage };
