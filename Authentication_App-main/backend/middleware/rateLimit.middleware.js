const rateLimit = require("express-rate-limit");

// Global limiter (for all APIs)
const globalLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 
  max: 100, // 100 requests per IP
  message: {
    success: false,
    message: "Too many requests, please try again later"
  }
});

// Auth limiter (login/signup/verify)
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
