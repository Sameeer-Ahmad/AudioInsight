const { AudioProcessingModel } = require("../model/audioProcessing.model");
const { SummaryModel } = require("../model/summary.model");
require("dotenv").config();



const { summarizeText } = require("../utils/summarizeText");

const { SpeechClient } = require("@google-cloud/speech").v1p1beta1;

const client = new SpeechClient();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const transcribe = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const { language } = req.query;
    const latestAudio = await AudioProcessingModel.findOne({
      where: {
        userId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });

   console.log("latestAudio",latestAudio.mediaFileUrl);
   if (!latestAudio || !latestAudio.mediaFileUrl) {
    return res.status(404).json({ message: "No audio found" });
  }

    let prompt = `Translate the following transcription to ${language}: "${latestAudio.transcription}"`;

    const result = await model.generateContent([prompt]);
    const transcription = result.response
      .text()
      .replace(/(\r\n|\n|\r|\\)/gm, " ")
      .trim();

    return res.status(200).json({ transcription });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving transcription" });
  }
};

const summarize = async (req, res) => {
  try {
    const { language } = req.query; 
    const latestAudio = await AudioProcessingModel.findOne({
      where: {
        userId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });

    if (!latestAudio) {
      return res.status(404).json({ error: "Audio not found" });
    }

    const transcription = latestAudio.transcription;

    const summary = await summarizeText(transcription, language);

    // Store the summary and its language in the database
    const newSummary = await SummaryModel.create({
      audioProcessingId: latestAudio.id,
      summary,
      language,
    });

    res.json(newSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred during summarization",
    });
  }
};






module.exports = { transcribe, summarize };
