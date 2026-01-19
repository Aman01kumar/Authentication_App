const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth.middleware");
const {
  getAccount,
  updateBalance,
  transferBalance
} = require("../controllers/account.controller");

router.get("/", authMiddleware, getAccount);
router.put("/balance", authMiddleware, updateBalance);
router.post("/transfer", authMiddleware, transferBalance);

module.exports = router;
