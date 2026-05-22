const { body } = require('express-validator');

const createUserValidation = [
  body('fullName')
    .notEmpty()
    .withMessage('Full name is required')
    .isString()
    .withMessage('Full name must be a string')
    .trim(),

  body('favoriteCuisines')
    .isArray({ min: 1 })
    .withMessage('Favorite cuisines must be a non-empty array'),

  body('favoriteCuisines.*')
    .isString()
    .withMessage('Cuisine must be a string')
    .trim(),
];

module.exports = {
  createUserValidation,
};