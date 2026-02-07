const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Account = require("../models/account.model");
const { generateToken } = require("../utils/token.util");
const { successResponse, errorResponse } = require("../utils/response.util");
const { generateOTP, getOTPExpiry } = require("../utils/otp.util");
const { sendVerificationEmail } = require("../utils/email.util");


const signup = async (req, res) => {
  try {
    const { username, email, password} = req.body;

    // 1. Validate input
    if (!username || !email || !password) {
      return errorResponse(res, 400, "All fields are required");
    }

    // 2. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 409, "User already exists");
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Generate OTP
    const otp = generateOTP();

    // 5. Create user (NOT verified)
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationCode: otp,
      verificationExpiresAt: getOTPExpiry()
    });

    // 6. Create account
    await Account.create({
      userId: user._id
    });

    // 7. Send verification email
    await sendVerificationEmail(email, otp);

    return successResponse(
      res,
      201,
      "Signup successful. Verification code sent to email."
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const verifyAccount = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return errorResponse(res, 400, "Username and verification code required");
    }

    const user = await User.findOne({email });

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    if (
      user.verificationCode !== code ||
      user.verificationExpiresAt < Date.now()
    )
     {
      return errorResponse(res, 400, "Invalid or expired verification code");
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationExpiresAt = undefined;

    await user.save();

    return successResponse(res, 200, "Account verified successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 400, "Username and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    if (!user.isVerified) {
      return errorResponse(res, 403, "Please verify your account first");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    const token = generateToken({
      userId: user._id,
      email: user.email
    });

    return successResponse(res, 200, "Login successful", {
      token,
      userId: user._id
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  signup,
  verifyAccount,
  login
};
