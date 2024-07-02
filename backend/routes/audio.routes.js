const express = require("express");
const latestRouter = express.Router();
const { audioUpload } = require("../controller/AudioProcessing.controller");
const {
  transcribe,
  summarize,
  speakerDiarization,
} = require("../controller/allFeature");

const upload = require("../utils/multer");
const authMiddleware = require("../middleware/auth.middleware");

const audioRouter = express.Router();
const transcribeRouter = express.Router();
const summarizeRouter = express.Router();
const diarizeRouter = express.Router();

audioRouter.post("/upload", upload, audioUpload);

transcribeRouter.get("/transcribe",authMiddleware, transcribe);

summarizeRouter.get("/summary", authMiddleware,summarize);

diarizeRouter.post("/diarize",authMiddleware, speakerDiarization);

module.exports = {
  audioRouter,
  transcribeRouter,
  summarizeRouter,
  diarizeRouter,
  latestRouter,
};
