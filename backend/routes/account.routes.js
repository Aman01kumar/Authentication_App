const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth.middleware");
const {
  getAccount,
  updateBalance,
  transferBalance
} = require("../controllers/account.controller");

const validate = require("../middleware/validate.middleware");
const { transferValidator } = require("../validators/account.validator");

router.get("/", authMiddleware, getAccount);
router.put("/balance", authMiddleware, updateBalance);
router.post("/transfer", authMiddleware, transferValidator, validate, transferBalance);

module.exports = router;
