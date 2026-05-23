const express = require('express');

const {
  followRestaurantController,
} = require('./follow.controller');

const {
  followRestaurantValidation,
} = require('./follow.validation');

const validateRequest = require('../../middlewares/validateRequest.middleware');

const router = express.Router();

router.post(
  '/',
  followRestaurantValidation,
  validateRequest,
  followRestaurantController
);

module.exports = router;