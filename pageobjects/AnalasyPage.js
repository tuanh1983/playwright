class AnalasyPage {
  constructor(page) {
    this.lvDropdown = page.getByText("Lagvælger");
    this.loadingSpinner = page.locator(".spinner-border");
    this.drarPoint = page.getByText("Tegn punkt");
    this.map = page.locator("canvas").first();
    this.anylyzeButton = page.locator(".execute-analysis-button");
    this.cancelAnalyze = page.locator(".cancel-analyze");
    this.sendReportButton = page
      .locator(
        "//div[@class='wizard-navigate']//button[contains(@class,'btn-save')]"
      )
      .first();
    this.reportDialog = page.locator("//div[@class='modal']");
    this.reportName = this.reportDialog
      .locator("//input[@class='form-control']")
      .first();
    this.reportEmail = this.reportDialog
      .locator("//input[@class='form-control']")
      .nth(1);
    this.sendReportButtonOnReportDialog = this.reportDialog.locator(
      // Corrected property name
      "//button[contains(@class,'btn-save')]"
    );
  }
  async selectPoint(xLocation, yLocation) {
    await this.lvDropdown.click();
    await this.loadingSpinner.waitFor({ state: "hidden" });
    await this.drarPoint.click();
    await this.map.click({
      position: {
        x: xLocation,
        y: yLocation,
      },
    });
  }
  async clickAnalyze() {
    await this.anylyzeButton.click(); // Corrected property name
  }
  async waitForAnalysis() {
    // Corrected method name
    await this.cancelAnalyze.waitFor({ state: "hidden" });
  }
  async clickSendReport() {
    await this.sendReportButton.click(); // Corrected property name
  }
  async fillReportInfo(reportName, reportEmail) {
    await this.reportName.fill(reportName);
    await this.reportEmail.fill(reportEmail);
  }
  async clickSendReportOnReportDialog() {
    await this.sendReportButtonOnReportDialog.click(); // Corrected property name
  }
}
module.exports = { AnalasyPage };
