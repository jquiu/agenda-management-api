require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/database");

const app = express();

// Configuración de middlewares
app.use(cors()); // Habilita CORS para permitir solicitudes desde cualquier origen
app.use(express.json()); // Permite analizar el cuerpo de las solicitudes como JSON

// Conexión a la base de datos
connectDB()
  .then((db) => {
    console.log("Conexión a la base de datos exitosa");
    // Puedes guardar la instancia de la base de datos en app.locals para usarla en otros módulos
    app.locals.db = db;
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

// Rutas
app.use("/api", require("./src/routes/apiRoutes")); // Importa y configura las rutas

// Middleware de manejo de errores (se coloca al final)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
