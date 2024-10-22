// src/models/paymentType.js
const mongoose = require("mongoose");

const PaymentTypeSchema = new mongoose.Schema({
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

module.exports = mongoose.model("PaymentType", PaymentTypeSchema);
