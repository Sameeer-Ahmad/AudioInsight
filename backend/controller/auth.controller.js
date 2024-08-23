require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Blacklist } = require("../model/blacklist.model");
const { UserModel } = require("../model/user.model");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkUser = await UserModel.findOne({ where: { email } });
    console.log(checkUser);
    if (checkUser) {
      return res.status(401).send("User is already registered");
    }
    bcrypt.hash(password, 10, async (err, data) => {
      if (err) throw new Error(err.message);
      const user = new UserModel({ username, email, password: data });
      await user.save();
      return res
        .status(201)
        .send({ msg: `user registered successfully`, user });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to signup");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }
  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, username: user.username },

      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.status(200).json({ message: "Login successful", accessToken ,username:user.username});
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  const header = req.headers["authorization"];
  const token = header.split(" ")[1];
  try {
    if (!token) {
      res.status(401).send("token not provided");
    }
    const userToken = new Blacklist({ token });
    await userToken.save();
    return res.status(201).send({ msg: "user logout successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  signup,
  login,
  logout,
};
