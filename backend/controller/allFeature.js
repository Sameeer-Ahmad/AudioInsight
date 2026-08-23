const { AudioProcessingModel } = require("../model/audioProcessing.model");
const { SummaryModel } = require("../model/summary.model");
require("dotenv").config();

const { summarizeText } = require("../utils/summarizeText");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const transcribe = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
    const { language, audioId } = req.query;

    if (!audioId) {
      return res.status(400).json({ message: "audioId is required" });
    }

    const audio = await AudioProcessingModel.findOne({
      where: { id: audioId, userId: req.user.id },
    });

    if (!audio) {
      return res.status(404).json({ message: "Audio not found" });
    }

    let prompt = `Translate the following transcription to ${language}. If it contains "Speaker X:" labels, keep those labels as-is (translate only the surrounding text) and keep each speaker's turn on its own line.\n\n"${audio.transcription}"`;

    const result = await model.generateContent([prompt]);
    const transcription = result.response.text()
      .replace(/\r\n/g, "\n")
      .replace(/[ \t]+/g, " ")
      .trim();

    return res.status(200).json({ transcription });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving transcription" });
  }
};

const summarize = async (req, res) => {
  try {
    const { language, audioId } = req.query;

    if (!audioId) {
      return res.status(400).json({ error: "audioId is required" });
    }

    const audio = await AudioProcessingModel.findOne({
      where: { id: audioId, userId: req.user.id },
    });

    if (!audio) {
      return res.status(404).json({ error: "Audio not found" });
    }

    const transcription = audio.transcription;

    if (!transcription) {
      return res.status(404).json({ error: "transcription not found" });
    }
    const summary = await summarizeText(transcription, language);

    // Store the summary and its language in the database
    const newSummary = await SummaryModel.create({
      audioProcessingId: audio.id,
      summary,
      language,
    });

    res.status(200).json(newSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred during summarization",
    });
  }
};


module.exports = { transcribe, summarize };
