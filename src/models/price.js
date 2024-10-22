// src/models/price.js
const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  periodicity: {
    type: String,
    enum: ["daily", "weekly", "monthly", "yearly"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Price", PriceSchema);
