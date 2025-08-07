const express = require("express");
const route = express.Router();
const User = require("../model/userModal");
const { jwtAuthMiddleware, generatejwttoken } = require("../jwt");

route.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const user = new User(data);
    let responce = await user.save();
    const payload = {
      id: responce.id,
      userName: responce.userName,
      email: responce.email,
    };
    const token = generatejwttoken(payload);
    user.token = token;
    responce = await user.save();
    res
      .status(200)
      .json({ message: "user create sucessfully", responce: responce });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "internal server error", error: error });
  }
});
route.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName: userName });
    if (!user || !(await user.comparePassword(password))) {
      res.status(400).json({ message: "username or password not found" });
    }
    res.status(200).json({ message: "user login sucessfully", response: user });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "internal server error", error: error });
  }
});
route.delete("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "user deleted sucessfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "internal server error", error: error });
  }
});

route.patch("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const { prevPassword, currentPassword } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!(await user.comparePassword(prevPassword))) {
      return res.status(502).json({ message: "invalid password" });
    }
    user.password = currentPassword;
    await user.save();
    res.status(200).json({ message: "password changed successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "internal server error", error: error });
  }
});

route.patch("/userDetail", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedData = req.body;
    const response = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "profile updated successfully", response: response });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

module.exports = route;
