const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("index.ejs", { title: 1 });
});
router.get("/news", (req, res) => {
  res.render("news.ejs", { title: 1 });
});
router.get("/cases", (req, res) => {
  res.render("cases.ejs", { title: 1 });
});
router.get("/case-detail", (req, res) => {
  res.render("case-detail.ejs", { title: 1 });
});
module.exports = router;
