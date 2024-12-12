const ExcelJS = require("exceljs");
const workbook = new ExcelJS.Workbook();
async function writeExcel(fileName, searchValue, updateValue) {
  await workbook.xlsx.readFile(fileName);
  const worksheet = workbook.getWorksheet("Sheet1");
  const result = await readExcelForScan(worksheet, searchValue);
  console.log(`hjkhkj ${result.row} ${result.column}`);
  if (result.row === -1 && result.column === -1) {
    console.error("Value not found");
  } else {
    var cell = worksheet.getCell(result.row, result.column);
    cell.value = updateValue;
    await workbook.xlsx.writeFile("test.xlsx");
  }
}
async function readExcelForScan(worksheet, searchValue) {
  let output = { row: -1, column: -1 };
  if (!worksheet) {
    console.error("Worksheet 'Sheet1' not found");
    return;
  }
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      console.log(`Cell ${rowNumber}, ${colNumber}: ${cell.value}`);
      if (cell.value === searchValue) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  return output;
}
writeExcel("test.xlsx", "scan", "scan01");
