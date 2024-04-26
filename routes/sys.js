const express = require("express");
const router = express.Router();

const sysController = require("../controller/sysController");
const productController = require("../controller/productController");
// const validator = require('../middleware/validator/userValidator')
const { verifyToken } = require("../util/jwt");

router
  .post("/login", sysController.login)
  .post("/registers", sysController.register)
  // 新闻
  .get("/get_newlist", verifyToken(false), sysController.newlist)
  .get("/get_newdetail", verifyToken(false), sysController.newDetail)
  .post("/del_new", verifyToken(), sysController.delNew)
  .post("/add_new", verifyToken(), sysController.addNew)
  // 产品
  .get("/get_brand_list", verifyToken(false), productController.getBrandList)
  .get(
    "/get_classfiy_list",
    verifyToken(false),
    productController.getClassfiyList
  )
  .get(
    "/get_product_list",
    verifyToken(false),
    productController.getProductList
  )
  .post("/add_brand", verifyToken(), productController.addBrand)
  .post("/add_classfiy", verifyToken(), productController.addClassfiy)
  .post("/add_product", verifyToken(), productController.addProduct)
  .post("/del_brand", verifyToken(), productController.delBrand)
  .post("/del_classfiy", verifyToken(), productController.delClassfiy)
  .post("/del_product", verifyToken(), productController.delProduct)
  .get("/get_brand_detail", verifyToken(), productController.getBrandDetail)
  .get(
    "/get_classfiy_detail",
    verifyToken(),
    productController.getClassfiyDetail
  )
  .get("/get_product_detail", verifyToken(), productController.getProductDetail)
  // 公司信息
  .post("/edit_company", verifyToken(), sysController.editCompany)
  .get("/get_company_detail", verifyToken(false), sysController.companyDetail)
  // banner管理
  .post("/edit_banner", verifyToken(), sysController.editBanner)
  .get("/get_banner_list", verifyToken(false), sysController.bannerList);

module.exports = router;
