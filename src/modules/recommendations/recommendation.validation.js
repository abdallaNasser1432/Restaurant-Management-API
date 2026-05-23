const { param } = require('express-validator');

const getRestaurantRecommendationsValidation = [
  param('userId')
    .notEmpty()
    .withMessage('User id is required')
    .isMongoId()
    .withMessage('User id must be a valid MongoDB ObjectId'),
];

module.exports = {
  getRestaurantRecommendationsValidation,
};