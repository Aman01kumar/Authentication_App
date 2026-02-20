const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth.middleware");
const {
  getProfile,
  updateProfile,
  deleteUser
} = require("../controllers/user.controller");

router.get("/me", authMiddleware, getProfile);

router.put("/me", authMiddleware, updateProfile);

router.delete("/me", authMiddleware, deleteUser);


module.exports = router;
