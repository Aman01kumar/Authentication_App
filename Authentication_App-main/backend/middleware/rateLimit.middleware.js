const rateLimit = require("express-rate-limit");

const globalLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 
  max: 100, 
  message: {
    success: false,
    message: "Too many requests, please try again later"
  }
});

const authLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 20, 
  message: {
    success: false,
    message: "Too many authentication attempts"
  }
});

module.exports = {
  globalLimiter,
  authLimiter
};
