require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../model/user.model");
const { blackList } = require("../model/blacklist.model");


const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ where: { email } });
    console.log(checkUser);
    if (checkUser) {
      return res.status(401).send("User is already registered");
    }
    bcrypt.hash(password, 10, async (err, data) => {
      if (err) throw new Error(err.message);
      const user = new User({ username, email, password: data });
      await user.save();
      return res.status(201).send("User registered Successfully");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to signup");
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    return res.status(404).send("plz fill the require fields");
  }
  try {
    const isUserExists = await User.findOne({ email });
    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExists.password
    );
    if (isPasswordMatch) {
      const accessToken = jwt.sign(
        {
          data: { email: isUserExists.email },
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      return res.status(201).send(accessToken);
    }
    return res.status(401).send("Invalid credentials");
  } catch (err) {
    console.log(err);
  }
};

const logout = async (req, res) => {
    const header = req.headers["authorization"];
    const token = header.split(" ")[1];
    try {
      if (!token) {
        res.status(401).send("token not provided");
      }
      const userToken = new blackList({ token });
      await userToken.save();
      return res.status(201).send("user logout successfully");
    } catch (err) {
      res.status(400).send(err);
    }
  };

module.exports = {
  signup,
  login,
  logout
};
