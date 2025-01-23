import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userSchema from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

// Sign Up
export const signUp = async (req, res) => {
  try {
    const { name, role, phoneNumber, email, place, age, gender, password } =
      req.body;

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new userSchema({
      name,
      role,
      phoneNumber,
      email,
      place,
      age,
      gender,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};

// Sign In
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user found. Please create an account.",
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};

// logout
export const logout = (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};
