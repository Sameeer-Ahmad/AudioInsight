const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing from authorization header" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log("decoded", decoded);

    const userId = decoded.userId;
    console.log("userId", userId);
    const user = await UserModel.findByPk(userId);
   console.log("user", user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
