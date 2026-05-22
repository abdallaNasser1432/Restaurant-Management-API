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

const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await restaurantService.getRestaurants(req.query);

  return sendSuccess(
    res,
    200,
    'Restaurants fetched successfully',
    restaurants
  );
});

const getRestaurantByIdentifier = asyncHandler(async (req, res) => {
  const restaurant = await restaurantService.getRestaurantByIdentifier(
    req.params.identifier
  );

  return sendSuccess(
    res,
    200,
    'Restaurant fetched successfully',
    restaurant
  );
});

const getNearbyRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await restaurantService.getNearbyRestaurants(req.query);

  return sendSuccess(
    res,
    200,
    'Nearby restaurants fetched successfully',
    restaurants
  );
});

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurantByIdentifier,
  getNearbyRestaurants,
};