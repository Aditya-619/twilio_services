const express = require('express');
const crypto = require('crypto');
const twilio = require('twilio');
const generateJWT = require('../utils/generate');
const { saveOTP, validateOTP } = require('../utils/helpers');


function generateOTP() {
    return crypto.randomInt(1000, 9999).toString();
}

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

async function sendWhatsAppOTP(phoneNumber, otp) {
  try {
    await client.messages.create({
      body: `Your verification code is: ${otp}`,
      from: 'whatsapp:+14155238886',
      to: `whatsapp:+91${phoneNumber}`
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending OTP to WhatsApp:", error);
    return { success: false, error };
  }
}

const router = express.Router();

router.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = generateOTP();
  await saveOTP(phoneNumber, otp);

  const response = await sendWhatsAppOTP(phoneNumber, otp);
  if (response.success) res.status(200).json({ message: 'OTP sent successfully!' });
  else res.status(500).json({ message: 'Failed to send OTP', error: response.error });
});

router.post('/verify-otp', async (req, res) => {
  const { phoneNumber, otp } = req.body;
  const isValid = await validateOTP(phoneNumber, otp);

  if (isValid) {
    const token = generateJWT(phoneNumber);
    res.status(200).json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ message: 'Invalid OTP or OTP expired' });
  }
});

module.exports = router;