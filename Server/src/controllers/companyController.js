import userSchema from "../models/User.js";
import companySchema from "../models/Company.js";
import mongoose from "mongoose";

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await companySchema.find();
    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await companySchema.findById(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

export const createCompanyProfile = async (req, res) => {
  try {
    const {
      userId,
      companyName,
      phoneNumber,
      email,
      address,
      city,
      pincode,
      gstNumber,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }

    const userById = await userSchema.findById(userId);
    if (!userById) {
      return res.status(400).json({ success: false, message: "No user found" });
    }

    const existingCompany = await companySchema.findOne({ userId });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company profile already exists for this user",
      });
    }

    const existingCompanyEmail = await companySchema.findOne({ email });
    if (existingCompanyEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already in use by another company",
      });
    }

    const company = new companySchema({
      userId,
      companyName,
      phoneNumber,
      email,
      address,
      city,
      pincode,
      gstNumber,
    });

    await company.save();

    res.status(201).json({
      success: true,
      message: "Company profile created successfully",
      company,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};

export const updateCompanyProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const company = await companySchema.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};
