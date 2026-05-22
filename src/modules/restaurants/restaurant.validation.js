const { body, query, param, validationResult } = require('express-validator');
const ApiError = require('../../utils/ApiError');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));

    return next(new ApiError(400, 'Validation failed', formattedErrors));
  }

  next();
};

const createRestaurantValidation = [
  body('name.ar')
    .notEmpty()
    .withMessage('Arabic restaurant name is required')
    .isString()
    .withMessage('Arabic restaurant name must be a string')
    .trim(),

  body('name.en')
    .notEmpty()
    .withMessage('English restaurant name is required')
    .isString()
    .withMessage('English restaurant name must be a string')
    .trim(),

  body('slug')
    .notEmpty()
    .withMessage('Restaurant slug is required')
    .isString()
    .withMessage('Restaurant slug must be a string')
    .trim()
    .toLowerCase()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must contain lowercase letters, numbers, and hyphens only'),

  body('cuisines')
    .isArray({ min: 1, max: 3 })
    .withMessage('Restaurant must have between 1 and 3 cuisines'),

  body('cuisines.*')
    .isString()
    .withMessage('Each cuisine must be a string')
    .trim()
    .notEmpty()
    .withMessage('Cuisine cannot be empty'),

  body('location.type')
    .optional()
    .equals('Point')
    .withMessage('Location type must be Point'),

  body('location.coordinates')
    .isArray({ min: 2, max: 2 })
    .withMessage('Coordinates must be an array of [longitude, latitude]'),

  body('location.coordinates.0')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),

  body('location.coordinates.1')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
];

const getRestaurantsValidation = [
  query('cuisine')
    .optional()
    .isString()
    .withMessage('Cuisine filter must be a string')
    .trim()
    .notEmpty()
    .withMessage('Cuisine filter cannot be empty'),
];

const getRestaurantByIdentifierValidation = [
  param('identifier')
    .notEmpty()
    .withMessage('Restaurant identifier is required')
    .isString()
    .withMessage('Restaurant identifier must be a string')
    .trim(),
];

module.exports = {
  validateRequest,
  createRestaurantValidation,
  getRestaurantsValidation,
  getRestaurantByIdentifierValidation,
};