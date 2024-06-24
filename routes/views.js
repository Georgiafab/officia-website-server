const express = require("express");
const router = express.Router();
const viewController = require("../controller/viewController");
router
  .get("/", async (req, res) => {
    // const data = await viewController.casesList();
    res.render("index.ejs", { title: 1 });
  })
  .get("/news", (req, res) => {
    res.render("news.ejs", { title: 1 });
  })
  .get("/cases", async (req, res) => {
    const data = await viewController.casesList(req.query);
    // console.log(data);
    res.render("cases.ejs", data);
  })
  .get("/case-detail/:id", async (req, res) => {
    // console.log(req.params);
    const data = await viewController.caseDetail(req.params);
    res.render("case-detail.ejs", data);
  });
module.exports = router;
