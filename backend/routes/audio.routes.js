const express = require("express");
const latestRouter = express.Router();
const { audioUpload } = require("../controller/AudioProcessing.controller");
const {
  transcribe,
  summarize,
  speakerDiarization,
  latestAudio,
} = require("../controller/allFeature");

const upload = require("../utils/multer");

const audioRouter = express.Router();
const transcribeRouter = express.Router();
const summarizeRouter = express.Router();
const diarizeRouter = express.Router();


audioRouter.post("/upload", upload, audioUpload);

transcribeRouter.get("/transcribe", transcribe);

summarizeRouter.post("/summary", summarize);

diarizeRouter.post("/diarize/:id", speakerDiarization);

//for audioQnA
latestRouter.get("/latest", latestAudio);

module.exports = {
  audioRouter,
  transcribeRouter,
  summarizeRouter,
  diarizeRouter,
  latestRouter,
};
