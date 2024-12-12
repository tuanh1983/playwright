const ExcelJS = require("exceljs");
const workbook = new ExcelJS.Workbook();
async function readExcel() {
  await workbook.xlsx.readFile("test.xlsx");
  const worksheet = workbook.getWorksheet("Sheet1");

  if (!worksheet) {
    console.error("Worksheet 'Sheet1' not found");
    return;
  }

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      console.log(`Cell ${rowNumber}, ${colNumber}: ${cell.value}`);
      cell.value = cell.value + " - updated";
    });
  });
  await workbook.xlsx.writeFile("test.xlsx");
}
readExcel();
