const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
const http = require("http");
const { ConnectToDB } = require("./config/db");
require("./model/index.model");
const { authRouter } = require("./routes/user.routes");
const { Server } = require("socket.io");
const app = express();
const authMiddleware = require("./middleware/auth.middleware");

// The regex fallback is dev-only (any localhost port). Deployments MUST set
// FRONTEND_URL, or CORS will reject the real deployed frontend's origin.
const FRONTEND_URL = process.env.FRONTEND_URL || /^http:\/\/localhost:\d+$/;

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: FRONTEND_URL },
});

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
