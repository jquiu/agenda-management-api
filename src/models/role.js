// src/models/role.js
const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  roleName: { type: String, required: true, unique: true },
  description: String,
});

module.exports = mongoose.model("Role", RoleSchema);
