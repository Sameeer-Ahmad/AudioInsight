const express = require("express");
const cors = require("cors");
const { ConnectToDB } = require("./config/db");
const { authRouter } = require("./routes/user.routes");

const app = express();
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.send("Vocal Vision AI Backend Server");
  } catch (err) {
    console.log(err);
  }
});

app.use("/user",authRouter)
app.listen(PORT, async () => {
  try {
    await ConnectToDB();
    console.log(`server is running on port ${PORT}`);
  } catch(err) {
    console.log(err);
  }
});
