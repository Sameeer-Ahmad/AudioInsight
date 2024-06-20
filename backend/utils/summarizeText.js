const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
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
  
  module.exports = { summarizeText };