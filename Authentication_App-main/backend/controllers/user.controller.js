const User = require("../models/user.model");
const fs = require("fs");
const path = require("path");
const Account = require("../models/account.model");
const File = require("../models/file.model");
const { successResponse, errorResponse } = require("../utils/response.util");


const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    return successResponse(res, 200, "User profile fetched", user);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};


const updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    return successResponse(res, 200, "Profile updated", user);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Fetch user files
    const files = await File.find({ userId });

    // 2. Delete files from disk
    for (const file of files) {
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    }

    // 3. Delete file records
    await File.deleteMany({ userId });

    // 4. Delete account record
    await Account.deleteOne({ userId });

    // 5. Delete user
    await User.deleteOne({ _id: userId });

    return successResponse(res, 200, "User account deleted successfully");
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteUser
};
