import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET;

export const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, secret, {
      expiresIn: "3d",
    });

    res
      .status(201)
      .json({ token, user: { id: newUser._id, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, secret, {
      expiresIn: "3d",
    });

    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
