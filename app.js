const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const cors = require("cors");
const sysRouter = require("./routes/sys");
const fontRouter = require("./routes/font");
const viewsRouter = require("./routes/views");
const handleTimeout = require("./middleware/handleTimeout");
const fs = require("fs");
const crypto = require("crypto");
const ejs = require("ejs");

// const webpack = require("webpack");
// const webpackDevMiddleware = require("webpack-dev-middleware");
// const webpackHotMiddleware = require("webpack-hot-middleware");
// const webpackConfig = require("./webpack.config.js");

// 计算文件的哈希值
function calculateFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);

    stream.on("data", (data) => {
      hash.update(data);
    });

    stream.on("end", () => {
      const hashValue = hash.digest("hex");
      resolve(hashValue);
    });

    stream.on("error", (error) => {
      reject(error);
    });
  });
}
const app = express();
// const compiler = webpack(webpackConfig);
app.use(compression());
app.use(cors());

app.use(handleTimeout);

// view engine setup
app.set("view engine", "ejs");
app.engine("ejs", ejs.__express);

// 使用 Webpack 中间件
// app.use(
//   webpackDevMiddleware(compiler, {
//     publicPath: webpackConfig.output.publicPath,
//   })
// );
// app.use(webpackHotMiddleware(compiler));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});
// ,{maxAge:1000*60*60}
app.use(express.static(path.join(__dirname, "static")));
// ,{maxAge:1000*60*60}
const option = {
  immutable: true,
  maxAge: 3600,
  // setHeaders: async (res, path) => {
  //   // 获取文件的哈希值
  //   const hashValue = await calculateFileHash(path);
  //   // 设置缓存控制头部
  //   res.setHeader("Cache-Control", "public, max-age=3600"); // 设置缓存 1 小时
  //   // 设置协商缓存头部
  //   res.setHeader("ETag", hashValue); // 使用文件的哈希值作为 ETag
  // },
};
app.use(express.static(path.join(__dirname, "views"), option));
app.use(express.static(path.join(__dirname, "public"), option));

// app.use('/', indexRouter);
app.use("/users/api", fontRouter);
app.use("/sys/api", sysRouter);

app.use("/admin", (req, res) => {
  res.header("Content-Type", "text/html");
  res.sendFile(__dirname + "/public/admin.html");
});
app.use("/", viewsRouter);
// ejs.clearCache();
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
