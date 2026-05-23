const Follow = require('./follow.model');
const User = require('../users/user.model');
const Restaurant = require('../restaurants/restaurant.model');
const ApiError = require('../../utils/ApiError');
const mongoose = require('mongoose');

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

const getUserFollowedRestaurants = async (userId) => {
  const userExists = await User.exists({ _id: userId });

  if (!userExists) {
    throw new ApiError(404, 'User not found');
  }

  const follows = await Follow.find({
    user: userId,
  })
    .populate('restaurant', 'name slug cuisines location')
    .sort({ createdAt: -1 });

  const restaurants = follows.map((follow) => follow.restaurant);

  return restaurants;
};

const getRestaurantFollowers = async (identifier) => {
  let restaurant;

  if (mongoose.Types.ObjectId.isValid(identifier)) {
    restaurant = await Restaurant.findById(identifier);
  } else {
    restaurant = await Restaurant.findOne({
      slug: identifier.toLowerCase().trim(),
    });
  }

  if (!restaurant) {
    throw new ApiError(404, 'Restaurant not found');
  }

  const follows = await Follow.find({
    restaurant: restaurant._id,
  })
    .populate('user', 'fullName favoriteCuisines')
    .sort({ createdAt: -1 });

  const users = follows.map((follow) => follow.user);

  return users;
};

module.exports = {
  followRestaurant,
  getUserFollowedRestaurants,
  getRestaurantFollowers,
};