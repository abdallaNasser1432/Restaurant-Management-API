const express = require('express');
const restaurantController = require('./restaurant.controller');
const {
  validateRequest,
  createRestaurantValidation,
} = require('./restaurant.validation');

const router = express.Router();

router.post(
  '/',
  createRestaurantValidation,
  validateRequest,
  restaurantController.createRestaurant
);

module.exports = router;