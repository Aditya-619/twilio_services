const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "aditya123456"; 
const JWT_EXPIRATION = "1h";

function generateJWT(phoneNumber) {
  const payload = { phoneNumber };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

module.exports = generateJWT;
