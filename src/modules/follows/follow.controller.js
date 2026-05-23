const {
  followRestaurant,
  getUserFollowedRestaurants,
  getRestaurantFollowers,
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

const getRestaurantFollowersController = asyncHandler(async (req, res) => {
  const users = await getRestaurantFollowers(req.params.identifier);

  sendSuccess(
    res,
    200,
    'Restaurant followers fetched successfully',
    users
  );
});

module.exports = {
  followRestaurantController,
  getUserFollowedRestaurantsController,
  getRestaurantFollowersController,
};