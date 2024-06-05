const { Classfiy, Case } = require("../model/index");
const lodash = require("lodash");

exports.getClassfiyDetail = async (req, res) => {
  try {
    const { id } = req.query;
    const detail = await Classfiy.findOne({ _id: id });
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

exports.getCaseDetail = async (req, res) => {
  try {
    const { id } = req.query;
    const detail = await Case.findOne({ _id: id });
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

exports.delCase = async (req, res) => {
  try {
    const { id } = req.body;
    const dbBack = await Case.findByIdAndRemove(id);
    res.json({
      code: 200,
      data: dbBack,
      message: "删除成功",
    });
  } catch (error) {
    res.json({
      code: 500,
      data: {},
      message: error.toString(),
    });
  }
};

exports.getCaseList = async (req, res) => {
  try {
    let { page = 1, size = 10, classfiy_id, case_name = "" } = req.query;
    const str = `.*${case_name}.*`;
    const reg = new RegExp(str);
    const searchOpt = {
      $or: [{ case_name: { $regex: reg } }],
    };
    if (size == 1000) {
      classfiy_id = await Classfiy.findOne({ enTitle: classfiy_id });
      // brand_id = await Brand.findOne({ enTitle: brand_id });
    }
    classfiy_id && (searchOpt.classfiy_id = classfiy_id);
    // brand_id && (searchOpt.brand_id = brand_id);
    const list = await Case.find(searchOpt)
      // .populate("brand_id")
      .populate("classfiy_id")
      .sort({ updateAt: -1 })
      .skip((page - 1) * size)
      .limit(size);
    const total = await Case.countDocuments(searchOpt);
    res.status(200).json({
      code: 200,
      data: {
        list,
        total,
        page: Number(page),
        size: Number(size),
      },
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

// 新增分类
exports.addCase = async (req, res) => {
  try {
    const id = req.body._id;
    const dbBack = id ? await Case.findById(id) : null;
    if (dbBack) {
      await Case.updateOne({ _id: id }, req.body);
    } else {
      const caseModel = new Case(req.body);
      await caseModel.save();
    }
    res.status(200).json({
      code: 200,
      data: {},
      message: "成功",
    });
  } catch (error) {
    res.status(200).json({
      code: error.code,
      data: {},
      message: error.toString(),
    });
  }
};

exports.delClassfiy = async (req, res) => {
  try {
    const { id } = req.body;
    const dbBack = await Classfiy.findByIdAndRemove(id);
    res.json({
      code: 200,
      data: dbBack,
      message: "删除成功",
    });
  } catch (error) {
    res.json({
      code: 500,
      data: {},
      message: error.toString(),
    });
  }
};

exports.getClassfiyList = async (req, res) => {
  try {
    let { page = 1, size = 10, classfiy_name = "" } = req.query;
    // const searchObj = {};
    const str = `.*${classfiy_name}.*`;
    const reg = new RegExp(str);
    const searchObj = {
      $or: [{ classfiy_name: { $regex: reg } }],
    };
    // if (size >= 100) {
    //   brand_id = await Brand.findOne({ enTitle: brand_id });
    // }
    // brand_id && (searchObj.brand_id = brand_id);

    const list = await Classfiy.find(searchObj)
      // .populate("brand_id")
      // .sort({ updateAt: -1 })
      .skip((page - 1) * size)
      .limit(size);
    const total = await Classfiy.countDocuments(searchObj);
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
  } catch (error) {
    res.status(200).json({
      code: 500,
      data: {},
      message: error.toString(),
    });
  }
};

// 新增分类
exports.addClassfiy = async (req, res) => {
  try {
    const id = req.body._id;
    const dbBack = id ? await Classfiy.findById(id) : null;
    if (dbBack) {
      await Classfiy.updateOne({ _id: id }, lodash.omit(req.body, ["_id"]));
    } else {
      const model = new Classfiy(req.body);
      await model.save();
    }
    res.status(200).json({
      code: 200,
      data: {},
      message: "成功",
    });
  } catch (error) {
    res.status(200).json({
      code: error.code,
      data: {},
      message: error.toString(),
    });
  }
};

// 删除品牌
// exports.delBrand = async (req, res) => {
//   try {
//     const { id } = req.body;
//     const dbBack = await Brand.findByIdAndRemove(id);
//     res.json({
//       code: 200,
//       data: dbBack,
//       message: "删除成功",
//     });
//   } catch (error) {
//     res.json({
//       code: 500,
//       data: {},
//       message: error.toString(),
//     });
//   }
// };

// // 新增,编辑品牌
// exports.addBrand = async (req, res) => {
//   try {
//     const id = req.body._id;
//     const dbBack = id ? await Brand.findById(id) : null;
//     if (dbBack) {
//       await Brand.updateOne({ _id: id }, { ...lodash.omit(req.body, ["_id"]) });
//     } else {
//       const brandwModel = new Brand(req.body);
//       await brandwModel.save();
//     }
//     res.status(200).json({
//       code: 200,
//       data: {},
//       message: "成功",
//     });
//   } catch (error) {
//     res.status(200).json({
//       code: error.code,
//       data: {},
//       message: error.toString(),
//     });
//   }
// };

// // 获取品牌列表
// exports.getBrandList = async (req, res) => {
//   try {
//     const { page = 1, size = 10 } = req.query;
//     const list = await Brand.find()
//       .sort({ sort_num: 1 })
//       .skip((page - 1) * size)
//       .limit(size);
//     const total = await Brand.countDocuments();
//     res.status(200).json({
//       code: 200,
//       data: {
//         list,
//         total,
//         page,
//         size,
//       },
//       message: "成功",
//     });
//   } catch (error) {
//     res.status(200).json({
//       code: 500,
//       data: {},
//       message: error.toString(),
//     });
//   }
// };
