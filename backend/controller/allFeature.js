const { AudioProcessingModel } = require("../model/audioProcessing.model");
const { TranscriptionModel } = require("../model/transcribe.model");

const { SummaryModel } = require("../model/summary.model");


require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { speechToText } = require("../utils/speachToText");
const { SpeakerModel } = require("../model/speakerDiarization.model");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);



const transcribe = async (req, res) => {
  try {
    const audioProcessingId = req.params.id;

    // Fetch the audio URL from the AudioProcessing table
    const audioProcessing = await AudioProcessingModel.findByPk(
      audioProcessingId
    );
    if (!audioProcessing) {
      return res.status(404).json({ error: "Audio not found" });
    }

    const audioUrl = audioProcessing.mediaFileUrl;

    const transcription = await speechToText(audioUrl);

    // Save the transcription to the Transcriptions table
    const newTranscription = await TranscriptionModel.create({
      audioProcessingId,
      transcription,
    });

    res.json(newTranscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during transcription" });
  }
};

const summarize = async (req, res) => {
  try {
    const audioProcessingId = req.params.id;

    // Fetch the audio URL from the AudioProcessing table
    const audioProcessing = await AudioProcessingModel.findByPk(
      audioProcessingId
    );
    if (!audioProcessing) {
      return res.status(404).json({ error: "Audio not found" });
    }

    const audioUrl = audioProcessing.mediaFileUrl;

    const transcription = await speechToText(audioUrl);

    // Generate summary
    const summary = await summarizeText(transcription);

    // Store the summary in the database
    const newSummary = await SummaryModel.create({
      audioProcessingId,
      summary,
    });

    res.json(newSummary);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "An error occurred during transcription and summarization",
      });
  }
};

async function summarizeText(transcribedText) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(
    `Create a well-summary for the following text then in new line after the space in row add original length and summary length and text for summary length and original length only in bold:
  ${transcribedText}`
  );
  const response = await result.response;
  let summary = response.text().trim();
  //   summary = summary.replace(/\n/g, "");
  console.log(summary);
  return summary;
}


const diarize = async (req, res) => {
    try {
      const audioProcessingId = req.params.id;
  
      // Fetch the audio URL from the AudioProcessing table
      const audioProcessing = await AudioProcessingModel.findByPk(
        audioProcessingId
      );
      if (!audioProcessing) {
        return res.status(404).json({ error: "Audio not found" });
      }
  
      const audioUrl = audioProcessing.mediaFileUrl;
  console.log("audio url",audioUrl);
      const speakers = await speechToText(audioUrl);
console.log("speakers",speakers);
  
      // Save the speakers to the Speakers table
      await SpeakerModel.bulkCreate(
        speakers.map((speaker) => ({
          ...speaker,
          audioProcessingId,
        }))
      );
  
      res.json({ message: "Speaker diarization completed successfully" , speakers});
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred during speaker diarization",
      });
    }
  };
module.exports = { transcribe, summarize, diarize };
