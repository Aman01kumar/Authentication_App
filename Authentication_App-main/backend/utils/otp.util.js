const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const getOTPExpiry = () => {
  return new Date(Date.now() + 1 * 60 * 1000); // 1minutes
};

module.exports = {
  generateOTP,
  getOTPExpiry
};
