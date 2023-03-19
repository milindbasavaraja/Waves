const { User } = require("../models/user");
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const userService = require("./user-service");

const createUser = async (email, password, firstname, lastname) => {
  try {
    if (await User.emailTaken(email)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Sorry, Email is already registered"
      );
    }
    const user = new User({ email, password, firstname, lastname });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const generateAuthToken = (user) => {
  const token = user.generateAuthToken();
  return token;
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "No email found");
    }

    if (!(await user.comparePassword(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Wrong Password.");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, generateAuthToken, signInWithEmailAndPassword };
