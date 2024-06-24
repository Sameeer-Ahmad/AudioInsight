const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const summarizeText = async (text, language) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Create a small well-summary in ${language} for the following text then in new line after the space in row add original length and summary length and text for summary length and original length only in bold:
  ${text}`;

  const result = await model.generateContent([prompt]);
  const summary = result.response
    .text()
    .replace(/(\r\n|\n|\r|\\)/gm, " ")
    .trim();

  return summary;
};

module.exports = { summarizeText };
