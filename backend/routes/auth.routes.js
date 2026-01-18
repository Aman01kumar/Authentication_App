const express = require("express");
const router = express.Router();

const { signup, login, verifyAccount } = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/verify", verifyAccount);
router.post("/login", login);

module.exports = router;
