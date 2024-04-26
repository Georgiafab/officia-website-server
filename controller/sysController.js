// const fs = require("fs");
// const { promisify } = require("util");
// const lodash = require('lodash')
const { User, New, Company, Banner } = require("../model/index");
const { createToken } = require("../util/jwt");
const { getCurrentTime } = require("../util");

// 编辑banner信息
exports.editBanner = async (req, res) => {
  try {
    const dbBack = await Banner.findOne({ main: 1 });
    if (dbBack) {
      await Banner.updateOne({ main: 1 }, req.body);
    } else {
      const cModel = new Banner({ ...req.body, main: 1 });
      await cModel.save();
    }
    res.status(200).json({
      code: 200,
      data: {},
      message: "成功",
    });
  } catch (error) {
    res.status(200).json({
      code: 500,
      data: {},
      message: error.toString(),
    });
  }
};

// banner管理
exports.bannerList = async (req, res) => {
  try {
    const detail = await Banner.findOne({ main: 1 });
    console.log(detail);
    res.status(200).json({
      code: 200,
      data: detail,
      message: "成功",
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
      code: 500,
    });
  }
};

// 公司详情
exports.companyDetail = async (req, res) => {
  try {
    const detail = await Company.findOne({ main: 1 });
    res.status(200).json({
      code: 200,
      data: detail,
      message: "成功",
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
      code: 500,
    });
  }
};

// 编辑公司信息
exports.editCompany = async (req, res) => {
  try {
    const dbBack = await Company.findOne({ main: 1 });
    if (dbBack) {
      await Company.updateOne({ main: 1 }, req.body);
    } else {
      const cModel = new Company({ ...req.body, main: 1 });
      await cModel.save();
    }
    res.status(200).json({
      code: 200,
      data: {},
      message: "成功",
    });
  } catch (error) {
    res.status(200).json({
      code: 500,
      data: {},
      message: error.toString(),
    });
  }
};

// 新闻
exports.delNew = async (req, res) => {
  try {
    const { id } = req.body;
    const dbBack = await New.findByIdAndRemove(id);
    console.log(dbBack);
    res.json({
      code: 200,
      data: dbBack,
      message: "删除成功",
    });
  } catch (error) {
    res.json({
      code: 500,
      message: error.toString,
    });
  }
};

// 新闻详情
exports.newDetail = async (req, res) => {
  try {
    let { id, type } = req.query;
    if (type) {
      const curr = await New.findOne({ enTitle: id });
      id = curr._id;
    }
    const list = await New.find().sort({ time: -1 });
    const index = list.findIndex((item) => item._id.toString() == id);

    // console.log(id, "111111");
    res.status(200).json({
      code: 200,
      data: {
        ...list[index]?.toJSON(),
        prev: {
          title: list[index - 1]?.title,
          id: list[index - 1]?._id,
          enTitle: list[index - 1]?.enTitle,
        },
        next: {
          title: list[index + 1]?.title,
          id: list[index + 1]?._id,
          enTitle: list[index + 1]?.enTitle,
        },
      },
      message: "成功",
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
      code: 500,
    });
  }
};

// 新闻列表
exports.newlist = async (req, res) => {
  const { page = 1, size = 10, keyward = "" } = req.query;
  const str = `.*${keyward}.*`;
  const reg = new RegExp(str);
  const searchOpt = {
    $or: [{ title: { $regex: reg } }, { content: { $regex: reg } }],
  };
  const list = await New.find(searchOpt)
    .sort({ time: -1 })
    .skip((page - 1) * size)
    .limit(size);
  const total = await New.countDocuments(searchOpt);
  res.status(200).json({
    code: 200,
    data: {
      list,
      total,
      page,
      size,
    },
    message: "成功",
  });
};

// 新增新闻
exports.addNew = async (req, res) => {
  try {
    const id = req.body._id;
    const timeObj = getCurrentTime(req.body.time);
    const time = `${timeObj.year}.${timeObj.month}.${timeObj.day}`;
    const mtime = `<span>${timeObj.day}</span><span>${timeObj.year}.${timeObj.month}</span>`;
    const newDate = { ...req.body, time, mtime };
    const dbBack = id ? await New.findById(id) : null;
    if (dbBack) {
      await New.updateOne({ _id: id }, newDate);
    } else {
      const newModel = new New({ ...newDate, id });
      await newModel.save();
    }
    res.status(200).json({
      code: 200,
      data: {},
      message: "成功",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      code: error.code || 500,
      data: {},
      message: messgae,
    });
  }
};

// 用户注册
exports.register = async (req, res) => {
  let dbBack = await User.findOne({ username: req.body.username });
  if (dbBack) {
    res.status(402).json({
      code: 402,
      message: "用户已注册！",
    });
    return;
  }
  const userModel = new User(req.body);
  await userModel.save();
  res.status(201).json({
    message: "注册成功",
  });
};

// 用户登录
exports.login = async (req, res) => {
  // 客户端数据验证
  // 链接数据库查询
  let dbBack = await User.findOne(req.body);
  if (!dbBack) {
    res.status(402).json({ message: "账号或密码不正确" });
    return;
  }

  dbBack = dbBack.toJSON();
  dbBack.token = await createToken(dbBack);
  res.status(200).json({
    code: 200,
    data: dbBack,
  });
};
