const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    
    originalName: String,
    filename: String,
    path: String,
    size: Number,
    mimeType: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
