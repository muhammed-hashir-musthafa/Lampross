import mongoose from "mongoose";
import userSchema from "../models/User.js";

//get users
export const getUsers = async (req, res) => {
  try {
    const users = await userSchema.find();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to add product : ${error.message}`,
    });
  }
};

//get users with id
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "No user found" });
    }

    const userById = await userSchema.findById(userId);

    if (!userById) {
      return res.status(400).json({ success: false, message: "No user found" });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: userById,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Bad request:${error.message}` });
  }
};
