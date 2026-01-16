const File = require("../models/file.model");
const { successResponse, errorResponse } = require("../utils/response.util");

/**
 * POST /api/files/upload
 */
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, 400, "No file uploaded");
    }

    const file = await File.create({
      userId: req.user.id,
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimeType: req.file.mimetype
    });

    return successResponse(res, 201, "File uploaded successfully", file);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

/**
 * GET /api/files
 */
const getFiles = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user.id });
    return successResponse(res, 200, "Files fetched successfully", files);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

/**
 * DELETE /api/files/:fileId
 */
const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await File.findOne({
      _id: fileId,
      userId: req.user.id
    });

    if (!file) {
      return errorResponse(res, 404, "File not found");
    }

    await file.deleteOne();

    return successResponse(res, 200, "File deleted successfully");
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

module.exports = {
  uploadFile,
  getFiles,
  deleteFile
};
