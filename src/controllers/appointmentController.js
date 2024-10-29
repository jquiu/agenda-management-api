// src/controllers/appointmentController.js
const Appointment = require("../models/appointment");

const getAppointments = async (req, res, next) => {
  try {
    const allAppointments = await Appointment.find({});
    res.status(200).json({
      success: true,
      data: allAppointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { getAppointments };
