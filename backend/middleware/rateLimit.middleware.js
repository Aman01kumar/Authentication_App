const rateLimit = require("express-rate-limit");

// Global limiter (for all APIs)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  message: {
    success: false,
    message: "Too many requests, please try again later"
  }
});

// Auth limiter (login/signup/verify)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts
  message: {
    success: false,
    message: "Too many authentication attempts"
  }
});

module.exports = {
  globalLimiter,
  authLimiter
};
