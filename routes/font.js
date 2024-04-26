const express = require("express");
const router = express.Router();
const fontController = require("../controller/fontController");
const { verifyToken } = require("../util/jwt");
const multer = require("multer");
const upload = multer({
  dest: "public/uploads/",
  fileFilter(req, file, callback) {
    // 解决中文名乱码的问题 latin1 是一种编码格式
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    callback(null, true);
  },
});
// const validator = require('../middleware/validator/userValidator')
// const {verifyToken}  = require('../util/jwt')
// const multer = require('multer')
// const upload =  multer({dest:'public/'})

router
  .post("/post_email", fontController.postemail)
  .get("/get_home_index", fontController.getIndex)
  .post(
    "/upload_img",
    verifyToken(),
    upload.single("img"),
    fontController.uploadImg
  )
  .get("/get_file_list", verifyToken(), fontController.fileList)
  .post("/del_file", verifyToken(), fontController.delFile)
  .post(
    "/replace_file",
    verifyToken(),
    upload.single("img"),
    fontController.replaceFile
  )
  .post("/add_dir", verifyToken(), fontController.addDir);

module.exports = router;
