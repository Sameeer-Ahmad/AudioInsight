const { AssemblyAI } = require("assemblyai");

const client = new AssemblyAI({
  apiKey: "853db12d0a474d7ab4538914edd2283d", 
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
