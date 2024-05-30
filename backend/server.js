const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.send("server is running");
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, async () => {
  try {
    console.log(`server is running on port ${PORT}`);
  } catch {
    console.log(err);
  }
});
