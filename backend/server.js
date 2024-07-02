const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
const http = require("http");
const { ConnectToDB } = require("./config/db");
const { authRouter } = require("./routes/user.routes");
const { Server } = require("socket.io");
const app = express();
const authMiddleware = require("./middleware/auth.middleware");

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const {
  audioRouter,
  transcribeRouter,
  summarizeRouter,
  diarizeRouter,
} = require("./routes/audio.routes");

require("events").EventEmitter.defaultMaxListeners = 20;

app.use("/user", authRouter);
app.use(
  "/audio",
  
  audioRouter,
  transcribeRouter,
  summarizeRouter,
  diarizeRouter
);

app.get("/", (req, res) => {
  res.send("Welcome to Audio-Insight");
});

require("./sockets/audioQnA")(io);

server.listen(PORT, async () => {
  try {
    await ConnectToDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});


