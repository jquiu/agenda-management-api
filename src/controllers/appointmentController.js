// src/controllers/appointmentController.js
const Appointment = require('../models/appointment');

const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAppointments };