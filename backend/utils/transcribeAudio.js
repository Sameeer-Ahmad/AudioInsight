const { AssemblyAI } = require("assemblyai");
require("dotenv").config();
const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_API_KEY, 
});

const transcribeAudio = async (audioUrl) => {
  const config = {
    audio_url: audioUrl,
  };

  try {
    const transcriptionResponse = await client.transcripts.transcribe(config);
    return transcriptionResponse.text;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    throw new Error("Transcription failed.");
  }
};

module.exports = { transcribeAudio };
