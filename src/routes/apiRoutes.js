const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const priceController = require("../controllers/priceController");
const loginController = require("../controllers/authController");
const userController = require("../controllers/userController");

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
router.get("/users", userController.getUsers);
router.post('/auth/login', loginController.login);

module.exports = router;
