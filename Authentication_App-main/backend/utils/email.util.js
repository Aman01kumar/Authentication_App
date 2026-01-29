const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"Authentication App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your account",
    html: `
      <h2>Email Verification</h2>
      <p>Your verification code is:</p>
      <h1>${otp}</h1>
      <p>This code expires in 10 minutes.</p>
    `
  });
};

module.exports = {
  sendVerificationEmail
};
