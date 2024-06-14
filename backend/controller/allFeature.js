const { AudioProcessingModel } = require("../model/audioProcessing.model");
const { SummaryModel } = require("../model/summary.model");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { speechToText } = require("../utils/speachToText");
const { SpeakerModel } = require("../model/speakerDiarization.model");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const axios = require("axios");
const { SpeechClient } = require("@google-cloud/speech");

const client = new SpeechClient()
const transcribe =  async (req, res) => {
  try {
    const audioProcessingId = req.params.id;

    // Find the audio processing entry for the given audioProcessingId
    const audioProcessing = await AudioProcessingModel.findByPk(audioProcessingId);

    if (!audioProcessing) {
      return res.status(404).json({ message: "Audio processing entry not found" });
    }

    // Return the transcription from the audio processing entry
    return res.status(200).json({ transcription: audioProcessing.transcription });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving transcription" });
  }
};

const summarize = async (req, res) => {
  try {
    const audioProcessingId = req.params.id;

    // Fetch the audio processing entry for the given audioProcessingId
    const audioProcessing = await AudioProcessingModel.findByPk(
      audioProcessingId
    );
    if (!audioProcessing) {
      return res.status(404).json({ error: "Audio not found" });
    }

    // Use the stored transcription for summarization
    const transcription = audioProcessing.transcription;

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
    res.status(500).json({
      error: "An error occurred during summarization",
    });
  }
};


async function summarizeText(transcribedText) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(
    `Create a small well-summary for the following text then in new line after the space in row add original length and summary length and text for summary length and original length only in bold:
  ${transcribedText}`
  );
  const response = await result.response;
  let summary = response.text().trim();
  //   summary = summary.replace(/\n/g, "");
  // console.log(summary);
  return summary;
}


const speakerDiarization = async (req, res) => {
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

    const speakers = await speechToTexts(audioUrl);

    // Save the speakers to the Speakers table
    await SpeakerModel.bulkCreate(
      speakers.map((speaker) => ({
        ...speaker,
        audioProcessingId,
      }))
    );

    res.json({ message: "Speaker diarization completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred during speaker diarization",
    });
  }
};

const speechToTexts = async (audioUrl) => {
  // Download the audio file from Cloudinary
  const responses = await axios({
    url: audioUrl,
    method: "GET",
    responseType: "arraybuffer",
  });

  const audioBuffer = Buffer.from(responses.data);

  // Dynamically import the file-type module
  const { fileTypeFromBuffer } = await import("file-type");
  const type = await fileTypeFromBuffer(audioBuffer);

  if (!type) {
    throw new Error("Unsupported audio format");
  }

  const audioBytes = audioBuffer.toString("base64");

  let encoding;
  let sampleRateHertz;

  switch (type.mime) {
    case "audio/mpeg":
      encoding = "MP3";
      sampleRateHertz = 16000; // Adjust based on your audio file sample rate
      break;
    case "audio/wav":
      encoding = "LINEAR16";
      sampleRateHertz = 16000; // Adjust based on your audio file sample rate
      break;
    case "audio/ogg":
      encoding = "OGG_OPUS";
      sampleRateHertz = 16000; // Adjust based on your audio file sample rate
      break;
    case "audio/flac":
      encoding = "FLAC";
      sampleRateHertz = 16000; // Adjust based on your audio file sample rate
      break;
    case "audio/aac":
      encoding = "ENCODING_UNSPECIFIED"; // Adjust based on your audio file sample rate
      sampleRateHertz = 16000; // Adjust based on your audio file sample rate
      break;
    case "audio/m4a":
      encoding = "AAC"; // or "AMR" depending on the audio format
      sampleRateHertz = 48000; // Adjust based on your audio file sample rate
      break;
    default:
      throw new Error("Unsupported audio format");
  }

  const request = {
    audio: {
      content: audioBytes,
    },
    config: {
      encoding,
      sampleRateHertz,
      languageCode: "en-US",
      enableSpeakerDiarization: true, // Enable speaker diarization
      diarizationSpeakerCount: 2, // Specify the number of speakers
    },
  };

  const [operation] = await client.longRunningRecognize(request);
  const [response] = await operation.promise();

  if (!response.results || response.results.length === 0) {
    throw new Error("No transcription results found");
  }
console.log("response.result",  response.results);
  const transcriptions = response.results.map((result) => {
    if (result.alternatives && result.alternatives.length > 0) {
      return {
        // startTime: result.alternatives[0].words[0].startTime.seconds,
        // endTime:
        //   result.alternatives[0].words[
        //     result.alternatives[0].words.length - 1
        //   ].endTime.seconds,
        speakerId: result.alternatives[0].speakerTag,
        spokenText: result.alternatives[0].transcript,
      };
    } else {
      // Handle the case where alternatives array is empty
      return null;
    }
  }).filter(Boolean); // Filter out null values
console.log("trancription",transcriptions);
  return transcriptions;
};




module.exports = { transcribe, summarize, speakerDiarization };
