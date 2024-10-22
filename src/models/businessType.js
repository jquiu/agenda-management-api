// src/models/businessType.js
const mongoose = require("mongoose");

const BusinessTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  translations: {
    es: {
      name: { type: String, required: true },
      description: String,
    },
    en: {
      name: { type: String, required: true },
      description: String,
    },
  },
});

module.exports = mongoose.model("BusinessType", BusinessTypeSchema);
