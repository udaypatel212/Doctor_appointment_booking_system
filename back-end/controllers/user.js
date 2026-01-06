const userModel = require("../models/user");
const { generateToken } = require('../utility/generateToken');
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports.registerUser = async (req, res) => {
  try {
    const { email, name, phone } = req.body;

    if (!email || !name || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser1 = await userModel.findOne({ phone });
    const existingUser2 = await userModel.findOne({ email });

    if (existingUser1 || existingUser2) {
      return res.status(400).json({
        success: false,
        message: "An account with this phone number or email already exists",
      });
    }

    const createdUser = await userModel.create({
      name,
      email,
      phone,
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: createdUser._id,
        email: createdUser.email,
        phone: createdUser.phone,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Fill all fields",
      });
    }

    const existingUser = await userModel.findOne({ email, phone });

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or phone",
      });
    }

    const token = generateToken(existingUser);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token:token,
      user: {
        id: existingUser._id,
        email: existingUser.email,
        phone: existingUser.phone,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};


