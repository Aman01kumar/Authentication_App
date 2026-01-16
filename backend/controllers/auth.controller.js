const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Account = require("../models/account.model");
const { generateToken } = require("../utils/token.util");
const { successResponse, errorResponse } = require("../utils/response.util");


const signup = async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    // 1. Validate input
    if (!username || !password || !firstName || !lastName) {
      return errorResponse(res, 400, "All fields are required");
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return errorResponse(res, 409, "User already exists");
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user
    const user = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName
    });

    // 5. Create account with initial balance
    await Account.create({
      userId: user._id,
      balance: 0
    });

    // 6. Generate JWT
    const token = generateToken(user);

    return successResponse(res, 201, "User registered successfully", {
      token,
      userId: user._id
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Validate input
    if (!username || !password) {
      return errorResponse(res, 400, "Username and password are required");
    }

    // 2. Find user
    const user = await User.findOne({ username });
    if (!user) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    // 4. Generate JWT
    const token = generateToken(user);

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
  login
};
