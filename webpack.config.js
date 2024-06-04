const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: [
    "webpack-hot-middleware/client?reload=true", // Webpack 热更新
    "./src/index.js", // 你的入口文件
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  mode: "development", // 或者 'production'
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          {
            loader: "html-loader", // 使用 html-loader 处理图片资源的引用
            // options: {
            //   attrs: ["img:src", "img:data-src"],
            // },
          },
          {
            loader: "ejs-html-loader", // 使用 ejs-html-loader 处理 .ejs 文件的 includes 语法
            options: {
              production: process.env.ENV === "production",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "views", "index.ejs"),
      filename: "index.html",
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "inline-source-map",
  stats: {
    children: true,
  },
};
