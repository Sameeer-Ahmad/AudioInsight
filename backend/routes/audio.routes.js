const express = require("express");
const latestRouter = express.Router();
const { audioUpload } = require("../controller/AudioProcessing.controller");
const {
  transcribe,
  summarize,
} = require("../controller/allFeature");

const upload = require("../utils/multer");

const audioRouter = express.Router();
const transcribeRouter = express.Router();
const summarizeRouter = express.Router();

audioRouter.post("/upload", upload, audioUpload);

transcribeRouter.get("/transcribe", transcribe);

summarizeRouter.get("/summary", summarize);


module.exports = {
  audioRouter,
  transcribeRouter,
  summarizeRouter,
  latestRouter,
};
