const { Schema, model } = require('mongoose');

const otpSchema = new Schema({
  phoneNumber: String,
  otp: String,
  expirationTime: Date
});

module.exports = model('OTP', otpSchema);