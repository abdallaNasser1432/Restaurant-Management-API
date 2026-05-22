const express = require('express');

const {
  createUserController,
  getUsersController,
  getUserByIdentifierController,
} = require('./user.controller');

const {
  createUserValidation,
  getUserByIdentifierValidation,
} = require('./user.validation');

const validateRequest = require('../../middlewares/validateRequest.middleware');

const router = express.Router();

router.post(
  '/',
  createUserValidation,
  validateRequest,
  createUserController
);

router.get('/', getUsersController);

router.get(
  '/:identifier',
  getUserByIdentifierValidation,
  validateRequest,
  getUserByIdentifierController
);

module.exports = router;