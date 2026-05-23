const {
  followRestaurant,
  getUserFollowedRestaurants,
} = require('./follow.service');
const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../utils/response');

const followRestaurantController = asyncHandler(async (req, res) => {
  const follow = await followRestaurant(req.body);

  sendSuccess(res, 201, 'Restaurant followed successfully', follow);
});

const getUserFollowedRestaurantsController = asyncHandler(
  async (req, res) => {
    const restaurants = await getUserFollowedRestaurants(
      req.params.userId
    );

    sendSuccess(
      res,
      200,
      'Followed restaurants fetched successfully',
      restaurants
    );
  }
);

module.exports = {
  followRestaurantController,
  getUserFollowedRestaurantsController,
};