const express = require('express');

const {
  createUserController,
} = require('./user.controller');

const {
  createUserValidation,
} = require('./user.validation');

const validateRequest = require('../../middlewares/validateRequest.middleware');

const router = express.Router();

router.post(
  '/',
  createUserValidation,
  validateRequest,
  createUserController
);

module.exports = router;