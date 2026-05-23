const express = require('express');

const {
  getRestaurantRecommendationsController,
} = require('./recommendation.controller');

const {
  getRestaurantRecommendationsValidation,
} = require('./recommendation.validation');

const validateRequest = require('../../middlewares/validateRequest.middleware');

const router = express.Router();

router.get(
  '/users/:userId/restaurants',
  getRestaurantRecommendationsValidation,
  validateRequest,
  getRestaurantRecommendationsController
);

module.exports = router;