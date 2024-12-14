const { test } = require("@playwright/test");
const { POManagerEATool } = require("../../pageobjects/POManagerEATool");
const loginData = require("../../data/loginData.json");
const testData = require("../../data/testDataTC01.json");

const userName = loginData.userName;
const password = loginData.password;

test.describe.configure({
  retries: 2,
  timeout: 180000, // Increased timeout to 120000ms (120 seconds)
  mode: "parallel",
  headless: false,
});

test("test", async ({ page }) => {
  // Đăng nhập và lưu trạng thái
  const poManager = new POManagerEATool(page);
  const landingPage = poManager.getLandingPage();
  await landingPage.goTo();
  await landingPage.gotoAnalysePage();

  await page.waitForLoadState("networkidle");
  const analysePage = poManager.getAnalasyPage();
  await analysePage.selectPoint(190, 210);
  await analysePage.clickAnalyze();
  await analysePage.waitForAnalysis();
  await analysePage.clickSendReport();
  await analysePage.fillReportInfo("Test Report", "tuanh_ti@yahoo.com");
  await analysePage.clickSendReportOnReportDialog();
});
