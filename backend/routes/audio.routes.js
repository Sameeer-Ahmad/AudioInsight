const express = require("express");
const latestRouter = express.Router();
const {
  audioUpload,
  getHistory,
  getAudioDetail,
  deleteAudio,
} = require("../controller/AudioProcessing.controller");
const {
  transcribe,
  summarize,
} = require("../controller/allFeature");

const upload = require("../utils/multer");

const audioRouter = express.Router();
const transcribeRouter = express.Router();
const summarizeRouter = express.Router();

audioRouter.post("/upload", upload, audioUpload);
audioRouter.get("/history", getHistory);
audioRouter.get("/detail/:id", getAudioDetail);
audioRouter.delete("/detail/:id", deleteAudio);

transcribeRouter.get("/transcribe", transcribe);

summarizeRouter.get("/summary", summarize);


module.exports = {
  audioRouter,
  transcribeRouter,
  summarizeRouter,
  latestRouter,
};
