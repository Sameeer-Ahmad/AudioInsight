const axios = require("axios");
const { SpeechClient } = require("@google-cloud/speech");

const client = new SpeechClient();

const speechToText = async (audioUrl) => {
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

  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");

  return transcription;
};

module.exports = { speechToText };
