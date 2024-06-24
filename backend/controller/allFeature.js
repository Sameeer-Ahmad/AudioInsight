const { AudioProcessingModel } = require("../model/audioProcessing.model");
const { SummaryModel } = require("../model/summary.model");
require("dotenv").config();
const axios = require("axios");
const {
  SpeakerModel,
  SpeakerSegmentModel,
} = require("../model/speakerDiarization.model");


const { summarizeText } = require("../utils/summarizeText");

const { SpeechClient } = require("@google-cloud/speech").v1p1beta1;

const client = new SpeechClient();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);


const transcribe = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const { language } = req.query;
    const latestAudio = await AudioProcessingModel.findOne({
      order: [["createdAt", "DESC"]],
    });

    if (!latestAudio) {
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
    const { language } = req.query; // Get the language parameter from query
    const latestAudio = await AudioProcessingModel.findOne({
      order: [["createdAt", "DESC"]],
    });

    if (!latestAudio) {
      return res.status(404).json({ error: "Audio not found" });
    }

    const transcription = latestAudio.transcription;

    // Generate the summary in the specified language
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
    console.log("audioUrl", audioUrl);

    const speakers = await speechToTexts(audioUrl);
    console.log("speakers", speakers);

    // Save the speakers to the Speakers table and their segments to the SpeakerSegments table
    const speakerPromises = speakers.map(async (speaker) => {
      // Save the speaker info
      const savedSpeaker = await SpeakerModel.create({
        audioProcessingId,
        speakerId: speaker.speakerId,
      });

      // Save the speaker segments
      const segmentPromises = speaker.segments.map((segment) => {
        return SpeakerSegmentModel.create({
          speakerId: savedSpeaker.id,
          startTime: segment.startTime,
          endTime: segment.endTime,
          spokenText: segment.spokenText,
        });
      });

      return Promise.all(segmentPromises);
    });

    await Promise.all(speakerPromises);

    res.json({
      message: "Speaker diarization completed successfully",
      speakers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred during speaker diarization",
    });
  }
};

const speechToTexts = async (audioUrl) => {
  try {
    // Download the audio file from the given URL
    const responses = await axios.get(audioUrl, {
      responseType: "arraybuffer",
    });
    const audioBuffer = Buffer.from(responses.data);

    // Determine the file type
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

    const [response] = await client.recognize(request);
    console.log("response.results", response.results);

    const speakers = [];
    const speakerSegments = {};

    response.results.forEach((result) => {
      result.alternatives.forEach((alternative) => {
        alternative.words.forEach((wordInfo) => {
          const speakerTag = wordInfo.speakerTag;
          if (!speakerSegments[speakerTag]) {
            speakerSegments[speakerTag] = [];
          }
          speakerSegments[speakerTag].push({
            startTime:
              wordInfo.startTime.seconds + wordInfo.startTime.nanos / 1e9,
            endTime: wordInfo.endTime.seconds + wordInfo.endTime.nanos / 1e9,
            spokenText: wordInfo.word,
          });
        });
      });
    });

    for (const [speakerId, segments] of Object.entries(speakerSegments)) {
      const spokenText = segments
        .map((segment) => segment.spokenText)
        .join(" ");
      speakers.push({
        speakerId,
        segments: [
          {
            startTime: segments[0].startTime,
            endTime: segments[segments.length - 1].endTime,
            spokenText,
          },
        ],
      });
    }

    console.log("transcriptions", speakers);
    return speakers;
  } catch (error) {
    console.error("Error in speechToTexts:", error.message);
    throw error;
  }
};

module.exports = { transcribe, summarize, speakerDiarization };
