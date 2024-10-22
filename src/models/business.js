// src/models/business.js
const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: String,
  geoLocation: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
  businessTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BusinessType",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Business", BusinessSchema);
