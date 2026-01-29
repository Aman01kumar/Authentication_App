const mongoose = require("mongoose");
const Account = require("../models/account.model");
const { successResponse, errorResponse } = require("../utils/response.util");

const getAccount = async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.user.id });

    if (!account) {
      return errorResponse(res, 404, "Account not found");
    }

    return successResponse(res, 200, "Account fetched", account);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

const updateBalance = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { amount } = req.body;

    if (typeof amount !== "number" || amount === 0) {
      return errorResponse(res, 400, "Valid amount required");
    }

    session.startTransaction();

    const account = await Account.findOne(
      { userId: req.user.id },
      null,
      { session }
    );

    if (!account || account.balance + amount < 0) {
      await session.abortTransaction();
      return errorResponse(res, 400, "Insufficient balance");
    }

    account.balance += amount;
    await account.save({ session });

    await session.commitTransaction();

    return successResponse(res, 200, "Balance updated", account);
  } catch (err) {
    await session.abortTransaction();
    return errorResponse(res, 500, err.message);
    
  } finally {
    session.endSession();
  }
};


const transferBalance = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { to, amount } = req.body;

    if (!to || typeof amount !== "number" || amount <= 0) {
      return errorResponse(res, 400, "Invalid transfer data");
    }

    if (to === req.user.id) {
      return errorResponse(res, 400, "Cannot transfer to yourself");
    }

    session.startTransaction();

    const sender = await Account.findOne(
      { userId: req.user.id },
      null,
      { session }
    );

    const receiver = await Account.findOne(
      { userId: to },
      null,
      { session }
    );

    if (!sender || !receiver) {
      await session.abortTransaction();
      return errorResponse(res, 404, "Account not found");
    }

    if (sender.balance < amount) {
      await session.abortTransaction();
      return errorResponse(res, 400, "Insufficient balance");
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save({ session });
    await receiver.save({ session });

    await session.commitTransaction();

    return successResponse(res, 200, "Transfer successful");
  } catch (err) {
    await session.abortTransaction();
    return errorResponse(res, 500, err.message);
  } finally {
    session.endSession();
  }
};

module.exports = {
  getAccount,
  updateBalance,
  transferBalance
};
