const express = require("express");
const { audioUpload } = require("../controller/AudioProcessing.controller");
const upload = require("../utils/multer");

const audioRouter = express.Router();

audioRouter.post("/upload", upload,  audioUpload);

module.exports = { audioRouter };
