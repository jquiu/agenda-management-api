// src/models/user.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  customerType: {
    type: String,
    enum: ["regular", "premium"],
    default: "regular",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  businesses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
