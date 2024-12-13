const base = require("@playwright/test");
exports.myTest = base.test.extend({
  testDataForOrder: {
    userName: "rahulshetty@gmail.com",
    password: "Iamking@000",
    searchProduct: "ADIDAS ORIGINAL",
  },
});
