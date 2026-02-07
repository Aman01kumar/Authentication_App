  const mongoose = require("mongoose");

  const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
      },

      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 30
      },
      
      password: {
        type: String,
        required: true,
        minlength: 6
      },


      isVerified: {
        type: Boolean,
        default: false
      },

      verificationCode: String,
      verificationExpiresAt: Date   
    },
    
    { timestamps: true }
  );

  const User = mongoose.model("User", userSchema);

  module.exports = User;
