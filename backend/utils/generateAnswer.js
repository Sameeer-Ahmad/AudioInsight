const axios = require("axios");

const generateAnswer = async (transcription, question) => {
  const apiKey = process.env.GEMINI_AI_API_KEY;
  const apiUrl = process.env.GEMINI_AI_API_URL; // Adjust the URL as per Gemini AI's documentation

  try {
    const response = await axios.post(apiUrl, {
      transcription,
      question,
      apiKey,
    });

    return response.data.answer;
  } catch (error) {
    console.error("Error generating answer:", error);
    throw error;
  }
};

module.exports = { generateAnswer };
