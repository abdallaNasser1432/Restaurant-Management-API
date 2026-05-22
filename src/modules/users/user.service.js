const User = require('./user.model');
const mongoose = require('mongoose');
const ApiError = require('../../utils/ApiError');

const createUser = async (userData) => {
  const normalizedData = {
    fullName: userData.fullName.trim(),
    favoriteCuisines: userData.favoriteCuisines.map((cuisine) =>
      cuisine.trim()
    ),
  };

  const user = await User.create(normalizedData);

  return user;
};

const getUsers = async () => {
  return User.find().sort({ createdAt: -1 });
};

const getUserByIdentifier = async (identifier) => {
  let user;

  if (mongoose.Types.ObjectId.isValid(identifier)) {
    user = await User.findById(identifier);
  } else {
    user = await User.findOne({
      fullName: {
        $regex: `^${identifier}$`,
        $options: 'i',
      },
    });
  }

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

module.exports = {
  createUser,
  getUsers,
  getUserByIdentifier,
};