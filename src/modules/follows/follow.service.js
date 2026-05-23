const Follow = require('./follow.model');
const User = require('../users/user.model');
const Restaurant = require('../restaurants/restaurant.model');
const ApiError = require('../../utils/ApiError');

const followRestaurant = async ({ userId, restaurantId }) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const restaurant = await Restaurant.findById(restaurantId);

  if (!restaurant) {
    throw new ApiError(404, 'Restaurant not found');
  }

  const existingFollow = await Follow.findOne({
    user: userId,
    restaurant: restaurantId,
  });

  if (existingFollow) {
    throw new ApiError(409, 'User already follows this restaurant');
  }

  const follow = await Follow.create({
    user: userId,
    restaurant: restaurantId,
  });

  return Follow.findById(follow._id)
    .populate('user', 'fullName favoriteCuisines')
    .populate('restaurant', 'name slug cuisines');
};

module.exports = {
  followRestaurant,
};