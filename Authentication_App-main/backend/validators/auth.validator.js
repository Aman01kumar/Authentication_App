const { body } = require("express-validator");

exports.signupValidator = [
  body("username")
    .trim()
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name required"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name required")
];

exports.loginValidator = [
  body("username")
    .trim()
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .notEmpty()
    .withMessage("Password required")
];

exports.verifyValidator = [
  body("username")
    .trim()
    .isEmail()
    .withMessage("Valid email required"),

  body("code")
    .isLength({ min: 6, max: 6 })
    .withMessage("6-digit verification code required")
];
