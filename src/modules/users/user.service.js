const User = require('./user.model');

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

module.exports = {
  createUser,
};