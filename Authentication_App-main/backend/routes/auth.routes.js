const express = require("express");
const router = express.Router();

const { signup, login, verifyAccount } = require("../controllers/auth.controller");
const { authLimiter } = require("../middleware/rateLimit.middleware");
const validate = require("../middleware/validate.middleware");
const {
  signupValidator,
  loginValidator,
  verifyValidator
} = require("../validators/auth.validator");

router.post("/signup", authLimiter, signupValidator, validate, signup);
router.post("/verify", authLimiter, verifyValidator, validate,  verifyAccount);
router.post("/login", authLimiter, loginValidator, validate, login);

module.exports = router;
