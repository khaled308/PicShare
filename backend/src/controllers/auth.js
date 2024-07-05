import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants.js";
import User from "../models/User.js";
import { sendVerificationEmail } from "../utils/email.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    const verificationToken = user.verificationToken.token;
    sendVerificationEmail(user.email, verificationToken);
    const { password: _, ...data } = user._doc;

    res.status(201).json({ message: "User created successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      "verificationToken.token": token,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verificationToken.expires < Date.now()) {
      user.generateVerificationToken();
      await user.save();
      sendVerificationEmail(user.email, user.verificationToken.token);
      return res.status(400).json({
        message: "Verification token has expired, a new one has been sent",
      });
    }

    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      sendVerificationEmail(user.email, user.verificationToken.token);
      return res.status(400).json({ message: "Please verify your email" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: _, ...data } = user._doc;
    res
      .status(200)
      .json({ message: "Login successful", data: { ...data, token } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
