const { AssemblyAI } = require("assemblyai");
require("dotenv").config();
const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_API_KEY, 
});

const transcribeAudio = async (audioUrl) => {
  const config = {
    audio_url: audioUrl,
    speaker_labels: true,
  };

  try {
    const transcriptionResponse = await client.transcripts.transcribe(config);

    const uniqueSpeakers = new Set(
      (transcriptionResponse.utterances || []).map((u) => u.speaker)
    );

    // Only worth labeling by speaker when more than one was actually detected.
    if (uniqueSpeakers.size > 1) {
      return transcriptionResponse.utterances
        .map((u) => `Speaker ${u.speaker}: ${u.text}`)
        .join("\n\n");
    }

    return transcriptionResponse.text;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    throw new Error("Transcription failed.");
  }
};

module.exports = { transcribeAudio };
