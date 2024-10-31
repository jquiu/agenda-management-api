// controllers/authController.js
const bcrypt = require('bcrypt');
const { userModel } = require('../models/user');
const { generarToken } = require('../utils/jwt');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel(username);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = generarToken(user);

      res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        token: token
      });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

module.exports = { login };