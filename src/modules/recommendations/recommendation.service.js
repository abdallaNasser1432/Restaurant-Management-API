const mongoose = require('mongoose');

const User = require('../users/user.model');
const Follow = require('../follows/follow.model');

const ApiError = require('../../utils/ApiError');

const getRestaurantRecommendations = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const recommendations = await Follow.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },

    {
      $unwind: '$user',
    },

    {
      $match: {
        'user._id': {
          $ne: new mongoose.Types.ObjectId(userId),
        },
        'user.favoriteCuisines': {
          $in: user.favoriteCuisines,
        },
      },
    },

    {
      $lookup: {
        from: 'restaurants',
        localField: 'restaurant',
        foreignField: '_id',
        as: 'restaurant',
      },
    },

    {
      $unwind: '$restaurant',
    },

    {
      $group: {
        _id: null,

        matchedUsers: {
          $addToSet: {
            _id: '$user._id',
            fullName: '$user.fullName',
            favoriteCuisines: '$user.favoriteCuisines',
          },
        },

        recommendedRestaurants: {
          $addToSet: {
            _id: '$restaurant._id',
            name: '$restaurant.name',
            slug: '$restaurant.slug',
            cuisines: '$restaurant.cuisines',
            location: '$restaurant.location',
          },
        },
      },
    },

    {
      $project: {
        _id: 0,
        matchedUsers: 1,
        recommendedRestaurants: 1,
      },
    },
  ]);

  return (
    recommendations[0] || {
      matchedUsers: [],
      recommendedRestaurants: [],
    }
  );
};

module.exports = {
  getRestaurantRecommendations,
};