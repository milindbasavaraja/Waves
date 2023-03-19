const { User } = require("../models/user");

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

module.exports = {
  findUserByEmail,
};
