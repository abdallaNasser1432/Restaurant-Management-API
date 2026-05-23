const express = require('express');

const {
  followRestaurantController,
  getUserFollowedRestaurantsController,
  getRestaurantFollowersController,
} = require('./follow.controller');

const {
  followRestaurantValidation,
  getUserFollowedRestaurantsValidation,
  getRestaurantFollowersValidation,
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

router.get(
  '/restaurants/:identifier/users',
  getRestaurantFollowersValidation,
  validateRequest,
  getRestaurantFollowersController
);

module.exports = router;