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
async function readExcelForScan() {
  let output = { row: -1, column: -1 };
  await workbook.xlsx.readFile("test.xlsx");
  const worksheet = workbook.getWorksheet("Sheet1");

  if (!worksheet) {
    console.error("Worksheet 'Sheet1' not found");
    return;
  }

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      console.log(`Cell ${rowNumber}, ${colNumber}: ${cell.value}`);
      if (cell.value === "scan") {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  var cell = worksheet.getCell(output.row, output.column);
  cell.value = cell.value + " - updated";
  await workbook.xlsx.writeFile("test.xlsx");
}
readExcelForScan();
