const mongoose = require("mongoose");
const md5 = require("../util/md5");
// const autoinc = require("mongoose-id-autoinc2");

const baseModel = require("./baseModel");

// autoinc.init(db);
// 用户表
exports.userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: (value) => md5(value),
    select: false,
  },
  ...baseModel,
});

// 新闻表
exports.newSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  enTitle: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: String,
    required: true,
  },
  mtime: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isHome: {
    type: Boolean,
    default: false,
  },
  ...baseModel,
});

// 品牌表
exports.BrandSchema = new mongoose.Schema({
  brand_name: {
    type: String,
    require: true,
  },
  enTitle: {
    type: String,
    required: true,
    unique: true,
  },
  sort_num: {
    type: Number,
    default: 0,
  },
  ...baseModel,
});

// 分类表
exports.classfiySchema = new mongoose.Schema({
  brand_id: {
    type: mongoose.ObjectId,
    required: true,
    ref: "Brand",
  },
  enTitle: {
    type: String,
    required: true,
    unique: true,
  },
  classfiy_name: {
    type: String,
    required: true,
  },
  ...baseModel,
});

// 产品表
exports.productSchema = new mongoose.Schema({
  brand_id: {
    type: mongoose.ObjectId,
    required: true,
    ref: "Brand",
  },
  classfiy_id: {
    type: mongoose.ObjectId,
    required: true,
    ref: "Classfiy",
  },
  product_name: {
    type: String,
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  detail_pdf: {
    type: Array,
    required: true,
  },
  ...baseModel,
});

// 静态资源表
exports.fileSchema = new mongoose.Schema({
  filepath: {
    type: String,
    required: true,
  },
  ...baseModel,
});

// 公司信息
exports.companySchema = new mongoose.Schema({
  main: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  englishName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  serverTime: {
    type: String,
    required: true,
  },
  qrcodeImg: {
    type: String,
    required: true,
  },
  presale: {
    type: String,
    required: true,
  },
  aftersale: {
    type: String,
    required: true,
  },
  mapUrl: {
    type: String,
    required: true,
  },
  aboutusMsg: {
    type: String,
    required: true,
  },
  wxcode: {
    type: String,
    required: true,
  },
  qqcode: {
    type: String,
    required: true,
  },
  copyright: {
    type: String,
    required: true,
  },
  aboutImg: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  fax: {
    type: String,
    required: true,
  },
  footerTel: {
    type: Array,
    require: true,
  },
  footerAdd: {
    type: Array,
    require: true,
  },
  record: {
    type: Object,
    required: true,
  },
  logo1: {
    type: Object,
    required: true,
  },
  logo2: {
    type: Object,
    required: true,
  },
  ...baseModel,
});

// banner资源表
exports.bannerSchema = new mongoose.Schema({
  main: {
    type: Number,
    required: true,
  },
  news: {
    type: String,
    required: true,
  },
  abouts: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    require: true,
  },
  contact: {
    type: String,
    require: true,
  },
  ...baseModel,
});
