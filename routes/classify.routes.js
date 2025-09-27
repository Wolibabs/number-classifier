const express = require("express");
const router = express.Router();
const { classifyNumber } = require("../controller/classify.controller");

router.get("/classify-number", classifyNumber);

module.exports = router;
