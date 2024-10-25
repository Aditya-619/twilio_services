const mongoose = require('mongoose');
const OTPModel = require('../model/phone.js');
const saveOTP = async (phoneNumber, otp) => {
    const expirationTime = new Date(Date.now() + 2 * 60 * 1000);
    await OTPModel.create({ phoneNumber, otp, expirationTime });
}
  
const validateOTP = async(phoneNumber, otp) => {
    const record = await OTPModel.findOne({ phoneNumber, otp });
    if (record && new Date() < record.expirationTime) {
      await OTPModel.deleteOne({ _id: record._id });
      return true;
    }
    return false;
}

module.exports = { saveOTP, validateOTP};