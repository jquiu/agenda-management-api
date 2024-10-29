// src/controllers/priceController.js
const Price = require("../models/price");

const getPrices = async (req, res, next) => {
  try {
    const prices = await Price.find({});
    console.log(prices)
    res.status(200).json({
      success: true,
      data: prices,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getPriceById = async (req, res, next) => {
  try {
    const price = await Price.findById(req.params.id);
    if (!price) {
      return res.status(404).json({
        success: false,
        message: "Price not found",
      });
    }

    res.status(200).json({
      success: true,
      data: price,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid price ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deletePriceById = async (req, res, next) => {
  try {
    const price = await Price.findByIdAndDelete(req.params.id);
    if (!price) {
      return res.status(404).json({
        success: false,
        message: "Price not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Price deleted successfully",
    });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid price ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createPrice = async (req, res, next) => {
  try {
    const { name, value, description } = req.body;

    const newPrice = new Price({
      name,
      value,
      description,
    });

    const savedPrice = await newPrice.save();

    res.status(201).json({
      success: true,
      message: "Price created successfully",
      data: savedPrice,
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

const updatePriceById = async (req, res, next) => {
  try {
    const { name, value, description } = req.body;
    const priceId = req.params.id;

    const updatedPrice = await Price.findByIdAndUpdate(
      priceId,
      { name, value, description },
      { new: true, runValidators: true }
    );

    if (!updatedPrice) {
      return res.status(404).json({
        success: false,
        message: "Price not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Price updated successfully",
      data: updatedPrice,
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
        message: "Invalid price ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getPrices,
  getPriceById,
  deletePriceById,
  createPrice,
  updatePriceById,
};
