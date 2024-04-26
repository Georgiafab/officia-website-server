const nodemailer = require("nodemailer");
const { StaticFile, New } = require("../model/index");
const fs = require("fs");
const { promisify } = require("util");
const { getCurrentTime, getfilesize } = require("../util");
const path = require("path");
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const rm = promisify(fs.rm);
const rename = promisify(fs.rename);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);
const mkdir = promisify(fs.mkdir);
const images = require("images");

exports.postemail = async (req, res) => {
  const { name, tel, email, company, productname, msg } = req.body;
  if (!name) {
    res.json({
      code: 400,
      message: "您的称呼是必填项！",
    });
  } else if (!tel) {
    res.json({
      code: 400,
      message: "联系方式是必填项！",
    });
  } else {
    try {
      var transport = nodemailer.createTransport(
        "smtps://fortunatt_gw88%40163.com:RJLLEJAIEVGGWXJQ@smtp.163.com"
      );
      var mailOptions = {
        from: "fortunatt_gw88@163.com", //发件人
        to: "service1@fortuantt.com,gw@fortunatt.com", //收件人，可以设置多个
        subject: `意向咨询<${getCurrentTime().curTime}>`, //邮件主题
        html: `<p>您的称呼: ${name}</p >
               <p>联系方式: ${tel}</p >
               ${email ? `<p>电子邮件: ${email}</p >` : ""}
               ${company ? `<p>所在单位: ${company}</p >` : ""}
               ${productname ? `<p>意向产品: ${productname}</p >` : ""}
               ${msg ? `<p>您的需求: ${msg}</p >` : ""}
              `,
      };

      transport.sendMail(mailOptions, function (err, info) {
        if (err) {
          res.json({
            code: 400,
            message: err,
          });
          return console.log(err);
        }

        res.json({
          code: 200,
          message: info.response,
        });
        console.log("Message sent: " + info.response);
      });
    } catch (error) {
      res.json({
        code: 400,
        message: error.message,
      });
    }
  }
};

function fileType(fileStr) {
  const imgRex = /(.png|.jpg|.svg|.jpeg|.gif|.webp)$/g;
  const videoRex = /(.mp4)$/g;
  const pdfRex = /(.pdf)$/g;

  if (imgRex.test(fileStr)) {
    return "img";
  } else if (videoRex.test(fileStr)) {
    return "video";
  } else if (pdfRex.test(fileStr)) {
    return "pdf";
  } else {
    return "file";
  }
}

async function readDirInfo(tmpPath) {
  // 读path的路径是否为文件夹
  let info = await stat(tmpPath);

  // 保证外部给的路径是一个文件夹路径，才读读文件夹
  if (info.isDirectory()) {
    let dirset = [];
    // 是文件夹，就读文件夹
    let arr = await readdir(tmpPath);
    // 遍历
    let newArr = arr.map((item) => {
      //promise
      return new Promise(async (resolve, reject) => {
        let fullPath = path.join(tmpPath, item);
        // 每一个子路径是否为文件
        let info = await stat(fullPath);
        const descInfo = {
          update_time: getCurrentTime(info.mtime)?.curTime,
          size: getfilesize(info.size),
        };
        const pathstr = fullPath.replace(/^(public\/)/, "");
        // console.log(info);
        if (info.isFile()) {
          // 是，保存文件路径

          // console.log(path);
          resolve({
            title: item,
            type: fileType(fullPath),
            path: pathstr,
            ...descInfo,
          });
        } else {
          // 不是，继续读下一级，递归
          // let data = await readDirInfo(fullPath);
          resolve({
            title: item,
            type: "dir",
            path: pathstr,
            ...descInfo,
          });
        }
      });
    });

    let results = await Promise.all(newArr);
    // results.forEach(([key, value]) => {
    //   map[key] = value;
    // });
    // console.log(results)
    // dirset = results.filter(item => item.type === 'dir')
    results.sort((a, b) => {
      // return b.sort - a.sort
      if (a.type === "dir") {
        return -1;
      } else {
        return 0;
      }
    });
    return results;
  } else {
    throw new Error("参数需要是一个文件夹路径");
  }
}

// 上传图片
exports.uploadImg = async (req, res) => {
  const __dirname = "./public/uploads/";
  const dirpath = req.body.dirpath ? req.body.dirpath + "/" : "";
  try {
    await unlink(`${__dirname}${dirpath}${req.file.originalname}`);
  } catch {}
  try {
    await rename(
      `${__dirname}${req.file.filename}`,
      `${__dirname}${dirpath}${req.file.originalname}`
    );
    console.log(req.file);
    if (fileType(req.file.originalname) === "img" && req.body.quality) {
      images(`${__dirname}${dirpath}${req.file.originalname}`).save(
        `${__dirname}${dirpath}${req.file.originalname}`,
        { quality: req.body.quality }
      );
    }

    const model = new StaticFile({
      filepath: `/uploads/${dirpath}${req.file.originalname}`,
    });
    const dbBack = await model.save();
    res.status(200).json({
      code: 200,
      data: {
        url: `/uploads/${dirpath}${req.file.originalname}`,
        alt: req.file.originalname,
        href: "",
        fileid: dbBack._id,
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

// 新增文件夹
exports.addDir = async (req, res) => {
  const __dirname = "./public/uploads/";
  const dirpath = req.body.dirpath ? req.body.dirpath + "/" : "";

  try {
    await mkdir(`${__dirname}${dirpath}${req.body.dirname}`);
    res.status(200).json({
      code: 200,
      data: `${__dirname}${dirpath}${req.body.dirname}`,
      message: "成功",
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
      code: 500,
    });
  }
};

exports.fileList = async (req, res) => {
  const __dirname = "./public/uploads/";
  const { dirpath = "" } = req.query;

  readDirInfo(__dirname + dirpath)
    .then((data) => {
      res.json({
        code: 200,
        data: data,
        message: "成功",
      });
    })
    .catch((error) => {
      // console.log("失败:");
      // console.log(error);
      res.json({
        code: 500,
        message: error.toString(),
      });
    });

  // try {
  //   const files = await readdir(__dirname);

  //   for (const file of files){
  //     console.log(file.isFile());
  //   }
  //   res.send(files)
  // } catch (err) {
  //   console.error(err);
  // }
};

exports.delFile = async (req, res) => {
  const __dirname = "./public/";
  try {
    await rm(__dirname + req.body.path, { recursive: true });
    res.json({
      code: 200,
      message: "成功",
    });
  } catch (error) {
    res.json({
      code: 500,
      message: error.toString(),
    });
  }
};

exports.replaceFile = async (req, res) => {
  const __dirname = "./public/";
  // let patharr = req.body.path.split('/')
  // patharr.pop()
  // const pathstr = patharr.json('/')
  try {
    await rm(`${__dirname}${req.body.path}`);
  } catch {}
  try {
    console.log(req.file);
    await rename(
      `${__dirname}uploads/${req.file.filename}`,
      `${__dirname}${req.body.path}`
    );
    const cb = function () {
      stat(`${__dirname}${req.body.path}`).then((info) => {
        res.json({
          code: 200,
          message: "成功",
          size: getfilesize(info.size),
        });
      });
    };
    const type = req.file.mimetype.split("/").pop();
    if (fileType(req.file.originalname) === "img" && req.body.quality) {
      images(`${__dirname}${req.body.path}`).saveAsync(
        `${__dirname}${req.body.path}`,
        type,
        { quality: req.body.quality },
        cb
      );
    } else {
      cb();
    }
  } catch (error) {
    res.json({
      code: 500,
      message: error.toString(),
    });
  }
};

exports.getIndex = async (req, res) => {
  try {
    const data = await readFile(path.join(__dirname, "../model/index.json"), {
      encoding: "utf-8",
    });

    const newsMsg = await New.find({ isHome: true }).sort({ time: -1 });
    console.log(newsMsg);

    res.json({
      code: 200,
      data: {
        ...JSON.parse(data),
        newsMsg,
      },
      message: "成功",
    });
  } catch (error) {
    res.json({
      code: 500,
      message: error.toString(),
    });
  }
};
