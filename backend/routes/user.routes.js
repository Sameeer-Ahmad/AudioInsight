const express = require("express");
const {
  signup,
  login,
  logout,
  getProfile,
  changePassword,
} = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout",logout)
authRouter.get("/me", authMiddleware, getProfile);
authRouter.put("/me/password", authMiddleware, changePassword);

module.exports = { authRouter };
