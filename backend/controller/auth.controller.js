require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../model/user.model");

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

  module.exports={
    signup
  }
  