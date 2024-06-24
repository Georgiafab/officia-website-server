const mongoose = require("mongoose");
const sysModel = require("./sysModel");
const { mongopath } = require("../config/config.default");

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
  News: mongoose.model("News", sysModel.newsSchema),
  Brand: mongoose.model("Brand", sysModel.BrandSchema),
  Classfiy: mongoose.model("Classfiy", sysModel.classfiySchema),
  Case: mongoose.model("Case", sysModel.caseSchema),
  StaticFile: mongoose.model("StaticFile", sysModel.fileSchema),
  Company: mongoose.model("Company", sysModel.companySchema),
  Banner: mongoose.model("Banner", sysModel.bannerSchema),
  Index: mongoose.model("Index", sysModel.indexSchema),
  Counter: mongoose.model("Counter", sysModel.counterSchema),
};
