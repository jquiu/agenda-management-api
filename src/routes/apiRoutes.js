const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
router.get("/hello", (req, res) => {
  res.json({ message: "Hello World!" });
});

router.get("/appointments", appointmentController.getAppointments);

module.exports = router;
