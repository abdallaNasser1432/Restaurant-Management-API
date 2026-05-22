const express = require('express');
const restaurantController = require('./restaurant.controller');
const {
  createRestaurantValidation,
  getRestaurantsValidation,
  getRestaurantByIdentifierValidation,
  getNearbyRestaurantsValidation,
} = require('./restaurant.validation');
const validateRequest = require('../../middlewares/validateRequest.middleware');

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