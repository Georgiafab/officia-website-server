const mongoose = require("mongoose");
const sysModel = require("./sysModel");
const { mongopath } = require("../config/config.product");

async function mian() {
  await mongoose.connect(mongopath, {
    useNewUrlParser: true,
  });
}

mian()
  .then((res) => {
    console.log("mongo链接成功");
  })
  .catch((err) => {
    console.log(err);
    console.log("mongo链接失败");
  });

module.exports = {
  User: mongoose.model("User", sysModel.userSchema),
  New: mongoose.model("New", sysModel.newSchema),
  Brand: mongoose.model("Brand", sysModel.BrandSchema),
  Classfiy: mongoose.model("Classfiy", sysModel.classfiySchema),
  Product: mongoose.model("Product", sysModel.productSchema),
  StaticFile: mongoose.model("StaticFile", sysModel.fileSchema),
  Company: mongoose.model("Company", sysModel.companySchema),
  Banner: mongoose.model("Banner", sysModel.bannerSchema),
};
