const { body } = require("express-validator");

exports.transferValidator = [
  body("to")
    .isMongoId()
    .withMessage("Valid recipient userId required"),

  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Transfer amount must be greater than 0")
];
