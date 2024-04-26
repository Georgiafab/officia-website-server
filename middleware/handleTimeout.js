// import express, { Request, Response, NextFunction } from "express";
// import { HttpStatusCode } from "@/models/HttpStatusCode";
// import { TIMEOUT } from "@/config";
module.exports = (req, res, next) => {
  //   const time = TIMEOUT;
  // 设置所有HTTP请求的服务器响应超时时间
  res.setTimeout(500000, () => {
    const code = 408; // 408
    if (!res.headersSent) {
      // 若请求还未结束，则回复超时
      res.status(200).json({
        code,
        message: "请求响应超时",
      });
    }
  });
  next();
};
