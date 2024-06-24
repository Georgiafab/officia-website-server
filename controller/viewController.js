// const { StaticFile, News } = require("../model/index");
const { Classfiy, Case, Brand } = require("../model/index");
exports.casesList = async (query) => {
  const brandList = await Brand.find().sort({ enTitle: 1 });
  const list = await Classfiy.find();
  const classifys = [];
  brandList.forEach((el, index) => {
    if (!classifys[index]) {
      classifys[index] = {};
    }
    classifys[index].title = el.brand_name;
    classifys[index].content = list.filter(
      (item) => item.brand_id.toString() == el._id.toString()
    );
  });

  const searchOpt = {};
  const currClassify = {};
  if (query.type) {
    const classfiy = await Classfiy.findOne({ enTitle: query.type }).populate(
      "brand_id"
    );
    if (classfiy) {
      searchOpt["$or"] = [
        { classfiy_id1: classfiy },
        { classfiy_id2: classfiy },
      ];
      currClassify[classfiy.brand_id.enTitle] = classfiy;
    }
  }

  const caselist = await Case.find(searchOpt)
    .populate("classfiy_id1")
    .populate("classfiy_id2")
    .skip((Number(query.page) - 1) * 10)
    .limit(10);
  const total = await Case.countDocuments(searchOpt);

  return {
    classifys,
    caselist,
    currClassify,
    pages: {
      total,
      curr: query.page,
      totalPage: Math.ceil(total / 10),
    },
  };
  try {
  } catch (error) {}
};

exports.caseDetail = async (param) => {
  const caseDetail = await Case.findOne({ enTitle: param.id })
    .populate("classfiy_id1")
    .populate("classfiy_id2");
  console.log(caseDetail);
  return caseDetail;
};
