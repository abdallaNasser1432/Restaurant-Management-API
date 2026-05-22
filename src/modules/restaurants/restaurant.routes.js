const express = require('express');
const restaurantController = require('./restaurant.controller');

const router = express.Router();

router.post('/', restaurantController.createRestaurant);

module.exports = router;