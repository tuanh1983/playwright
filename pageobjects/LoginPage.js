class LoginPage {
  constructor(page) {
    this.username = page.locator("#userEmail");
    this.password = page.locator("Iamking@000");
    this.loginButton = page.locator("#username");
  }
  async login(username, password) {
    await this.username.type(username);
    await this.password.type(password);
    await this.loginButton.click();
  }
  goTo() {
    return this.page.goto("https://rahulshettyacademy.com/client");
  }
}
module.exports = { LoginPage };
