const { body, param  } = require('express-validator');

const followRestaurantValidation = [
  body('userId')
    .notEmpty()
    .withMessage('User id is required')
    .isMongoId()
    .withMessage('User id must be a valid MongoDB ObjectId'),

  body('restaurantId')
    .notEmpty()
    .withMessage('Restaurant id is required')
    .isMongoId()
    .withMessage('Restaurant id must be a valid MongoDB ObjectId'),
];

const getUserFollowedRestaurantsValidation = [
  param('userId')
    .notEmpty()
    .withMessage('User id is required')
    .isMongoId()
    .withMessage('User id must be a valid MongoDB ObjectId'),
];

const getRestaurantFollowersValidation = [
  param('identifier')
    .notEmpty()
    .withMessage('Restaurant identifier is required')
    .isString()
    .withMessage('Restaurant identifier must be a string')
    .trim(),
];

module.exports = {
  followRestaurantValidation,
  getUserFollowedRestaurantsValidation,
  getRestaurantFollowersValidation,
};