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
const io = new Server(server);

const {
  audioRouter,
  transcribeRouter,
  summarizeRouter,
} = require("./routes/audio.routes");


app.use("/user", authRouter);
app.use(
  "/audio",
  authMiddleware,
  audioRouter,
  transcribeRouter,
  summarizeRouter
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
