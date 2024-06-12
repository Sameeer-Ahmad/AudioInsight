const express = require("express");
const cors = require("cors");
const { ConnectToDB } = require("./config/db");
const { authRouter } = require("./routes/user.routes");

const { audioRouter, transcribeRouter, summarizeRouter, diarizeRouter,  } = require("./routes/audio.routes");
const authMiddleware = require("./middleware/auth.middleware");


const app = express();
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());

app.use("/user", authRouter);
app.use("/audio", authMiddleware, audioRouter,transcribeRouter,summarizeRouter,diarizeRouter);

app.listen(PORT, async () => {
  try {
    await ConnectToDB();
    console.log(`server is running on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});

