const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const User = mongoose.model("User", userSchema);
const jwt = require("jsonwebtoken");
//sign up
router.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      return hash;
    })
    .catch((err) => {
      console.log(err);
    });
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
  });
  await user
    .save()
    .then((data) => {
      res.status(200).json({
        message: "User was created successfully",
        user: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: `There was a server side error ${err}`,
      });
    });
});

//login
router.post("/login", async (req, res) => {
  const user = await User.find({ username: req.body.username });
  if (user && user.length > 0) {
    const isPasswordCorrect = await bcrypt
      .compare(req.body.password, user[0].password)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
    if (isPasswordCorrect) {
      //genorate token
      const token = jwt.sign(
        { username: user[0].username, userId: user[0]._id },
        "secret",
        {
          expiresIn: "1h",
        }
      );
      res
        .status(200)
        .json({ message: "User was logged in successfully", token });
    } else {
      res.status(401).json({ message: "Password is incorrect" });
    }
  } else {
    res.status(401).json({ message: "User was not found" });
  }
});

//get all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({ status: "active" }).populate("todos");
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: `There was a server side error ${err}` });
  }
});

module.exports = router;
