const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../utils/response');
const restaurantService = require('./restaurant.service');

const createRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await restaurantService.createRestaurant(req.body);

  return sendSuccess(
    res,
    201,
    'Restaurant created successfully',
    restaurant
  );
});

module.exports = {
  createRestaurant,
};