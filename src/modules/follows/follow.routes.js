const express = require('express');

const {
  followRestaurantController,
  getUserFollowedRestaurantsController,
} = require('./follow.controller');

const {
  followRestaurantValidation,
  getUserFollowedRestaurantsValidation,
} = require('./follow.validation');

const validateRequest = require('../../middlewares/validateRequest.middleware');

const router = express.Router();

router.post(
  '/',
  followRestaurantValidation,
  validateRequest,
  followRestaurantController
);

router.get(
  '/users/:userId/restaurants',
  getUserFollowedRestaurantsValidation,
  validateRequest,
  getUserFollowedRestaurantsController
);

module.exports = router;