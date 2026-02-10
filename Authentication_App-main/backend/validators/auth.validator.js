const { body } = require("express-validator");

exports.signupValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

exports.verifyValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

  body("code")
    .isLength({ min: 6, max: 6 })
    .withMessage("6-digit verification code required"),
];
