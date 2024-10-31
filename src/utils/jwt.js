const jwt = require('jsonwebtoken');

const generarToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
  };

  const SECRET_KEY = process.env.SECRET_KEY;

  const options = {
    expiresIn: '1h',
  };

  const token = jwt.sign(payload, SECRET_KEY, options);

  return token;
};

module.exports = { generarToken };