const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload.middleware");
const { authMiddleware } = require("../middleware/auth.middleware");
const {
  uploadFile,
  getFiles,
  deleteFile
} = require("../controllers/file.controller");

router.post("/upload", authMiddleware, upload.single("file"), uploadFile);
router.get("/", authMiddleware, getFiles);
router.delete("/:fileId", authMiddleware, deleteFile);

module.exports = router;
