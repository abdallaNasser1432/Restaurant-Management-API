const express = require('express');
const restaurantController = require('./restaurant.controller');
const {
  validateRequest,
  createRestaurantValidation,
  getRestaurantsValidation,
  getRestaurantByIdentifierValidation,
  getNearbyRestaurantsValidation,
} = require('./restaurant.validation');

const router = express.Router();

router.post(
  '/',
  createRestaurantValidation,
  validateRequest,
  restaurantController.createRestaurant
);

router.get(
  '/',
  getRestaurantsValidation,
  validateRequest,
  restaurantController.getRestaurants
);

router.get(
  '/nearby',
  getNearbyRestaurantsValidation,
  validateRequest,
  restaurantController.getNearbyRestaurants
);

router.get(
  '/:identifier',
  getRestaurantByIdentifierValidation,
  validateRequest,
  restaurantController.getRestaurantByIdentifier
);

module.exports = router;