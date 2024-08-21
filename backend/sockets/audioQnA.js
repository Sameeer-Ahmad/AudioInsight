const { AudioProcessingModel } = require("../model/audioProcessing.model");
const { AudioQnAModel } = require("../model/audioQnAModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

module.exports = (io) => {
  io.on("connection", (socket) => {
    // console.log(`A user connected: ${socket.id}`);

    socket.on("sendMessage", (data) => {
      console.log("Message received",data);
      socket.emit("receiveMessage", "Message received!");
    });

    socket.on("askQuestion", async ({ question }) => {
      try {
        const latestAudio = await AudioProcessingModel.findOne({
          order: [["createdAt", "DESC"]],
        });

        if (!latestAudio) {
          return socket.emit("error", "No audio found");
        }

        const transcription = latestAudio.transcription;

        const prompt = `Based on the provided transcription "${transcription}", answer the following question and don't make answer much lengthy: "${question}"`;


        const result = await model.generateContent([prompt]);
        const answer = result.response.text();

        await AudioQnAModel.create({
          audioProcessingId: latestAudio.id,
          question,
          answer,
        });

        // Emit the answer back to the client
        socket.emit("answer", { question, answer });
      } catch (error) {
        console.error("Error processing Q&A:", error);
        socket.emit("error", "Internal server error");
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
