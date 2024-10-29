const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const priceController = require("../controllers/priceController");

// Rutas Base
router.get("/hello", (req, res) => {
  res.json({ message: "Hello World!" });
});

router.get("/appointments", appointmentController.getAppointments);

router.get("/prices", priceController.getPrices);
router.get('/prices/:id', priceController.getPriceById);
router.delete('/prices/:id', priceController.deletePriceById);
router.post('/prices', priceController.createPrice);
router.put('/prices/:id', priceController.updatePriceById);

module.exports = router;
