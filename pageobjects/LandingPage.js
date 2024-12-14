class LandingPage {
  constructor(page) {
    this.page = page; // Added this.page
    this.acceptCokkie = page.getByRole("link", { name: "Tillad alle" });
    this.startButton = page.getByRole("button", { name: "Begynd" });
  }
  goTo() {
    this.page.goto("https://eatools.miljoeportal.dk/landing"); // Corrected to use this.page
  }
  async gotoAnalysePage() {
    await this.acceptCokkie.click();
    await this.startButton.click();
  }
}
module.exports = { LandingPage };
