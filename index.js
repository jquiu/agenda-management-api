require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/database");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
connectDB()
  .then((db) => {
    console.log("Conexión a la base de datos exitosa");
    app.locals.db = db;
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

// Rutas
app.use("/api", require("./src/routes/apiRoutes"));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: `Error interno del servidor ${err}` });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
