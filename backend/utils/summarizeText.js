const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const summarizeText = async (text, language) => {
  const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
  const prompt = `Create a concise summary in ${language} for the following text, then on a new line add the summary word count and original word count as plain text (no markdown formatting):
  ${text}`;

  const result = await model.generateContent([prompt]);
  const summary = result.response
    .text()
    .replace(/\r\n/g, "\n")
    .replace(/\*\*/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();

  return summary;
};

module.exports = { summarizeText };
