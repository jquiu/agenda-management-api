// src/controllers/userController.js
const user = require("../models/user");

const getUsers = async (req, res, next) => {
  try {
    const users = await user.find({});
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getuserById = async (req, res, next) => {
  try {
    const user = await user.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteuserById = async (req, res, next) => {
  try {
    const user = await user.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createuser = async (req, res, next) => {
  try {
    const { name, value, description } = req.body;

    const newuser = new user({
      name,
      value,
      description,
    });

    const saveduser = await newuser.save();

    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: saveduser,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateuserById = async (req, res, next) => {
  try {
    const { name, value, description } = req.body;
    const userId = req.params.id;

    const updateduser = await user.findByIdAndUpdate(
      userId,
      { name, value, description },
      { new: true, runValidators: true }
    );

    if (!updateduser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: updateduser,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getUsers,
  getuserById,
  deleteuserById,
  createuser,
  updateuserById,
};
