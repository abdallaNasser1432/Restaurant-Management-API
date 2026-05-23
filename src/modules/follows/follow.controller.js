const { followRestaurant } = require('./follow.service');
const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../utils/response');

const followRestaurantController = asyncHandler(async (req, res) => {
  const follow = await followRestaurant(req.body);

  sendSuccess(res, 201, 'Restaurant followed successfully', follow);
});

module.exports = {
  followRestaurantController,
};