const jwt = require("jsonwebtoken");
const { AudioProcessingModel } = require("../model/audioProcessing.model");
const { AudioQnAModel } = require("../model/audioQnAModel");
const { UserModel } = require("../model/user.model");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

module.exports = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        return next(new Error("Authentication required"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findByPk(decoded.userId);
      if (!user) {
        return next(new Error("Authentication required"));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error("Authentication required"));
    }
  });

  io.on("connection", (socket) => {
    // console.log(`A user connected: ${socket.id}`);
    socket.on("sendMessage", (data) => {
      console.log("Message received",data);
      socket.emit("receiveMessage", "Message received!");
    });

    socket.on("askQuestion", async ({ question, audioId }) => {
      try {
        if (!audioId) {
          return socket.emit("error", "audioId is required");
        }

        const audio = await AudioProcessingModel.findOne({
          where: { id: audioId, userId: socket.user.id },
        });

        if (!audio) {
          return socket.emit("error", "Audio not found");
        }

        const transcription = audio.transcription;

        const prompt = `You are answering questions about an audio recording for a user. Here is its transcription: "${transcription}".

The user said: "${question}"

- If this is a greeting or small talk (e.g. "hi", "hello", "thanks"), reply briefly and naturally, and invite them to ask something about the audio.
- If it's a question directly related to the content of the transcription or its context, answer it concisely and informatively.
- Otherwise, politely say the question doesn't seem related to this audio.`;

        const result = await model.generateContent([prompt]);
        const answer = result.response.text();

        await AudioQnAModel.create({
          audioProcessingId: audio.id,
          question,
          answer,
        });

        // Emiting the answer back to the client
        socket.emit("answer", { question, answer, audioId: audio.id });
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
