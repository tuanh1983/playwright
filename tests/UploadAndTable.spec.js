const ExcelJs = require("exceljs");
const { test, expect } = require("@playwright/test");
async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");
  const output = await readExcel(worksheet, searchText);

  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  return output;
}
test("Upload download excel validation", async ({ page }) => {
  const textSearch = "Mango";
  const updateValue = "350";
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html"
  );
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  await downloadPromise;
  writeExcelTest(
    textSearch,
    updateValue,
    { rowChange: 0, colChange: 2 },
    "download.xlsx"
  );
  await page.locator("#fileinput").click();
  await page.locator("#fileinput").setInputFiles("download.xlsx");

  await page.keyboard.press("Enter");
  const textlocator = page.getByText(textSearch);
  const row = await page
    .getByRole("row")
    .filter({ has: page.getByText(textSearch) });
  const cell = await row.locator('[data-column-id="4"] div');
  const cellText = await cell.textContent();

  console.log(cellText);
  await expect(cell).toHaveText(updateValue);
});
