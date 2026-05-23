const express = require('express');
const restaurantController = require('./restaurant.controller');
const {
  createRestaurantValidation,
  getRestaurantsValidation,
  getRestaurantByIdentifierValidation,
  getNearbyRestaurantsValidation,
} = require('./restaurant.validation');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: object
 *           properties:
 *             ar:
 *               type: string
 *             en:
 *               type: string
 *         slug:
 *           type: string
 *         cuisines:
 *           type: array
 *           items:
 *             type: string
 *         location:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               example: Point
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 */


/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *               - cuisines
 *               - location
 *             example:
 *               name:
 *                 ar: "مطعم الشام"
 *                 en: "Al Sham Restaurant"
 *               slug: "al-sham-restaurant"
 *               cuisines: ["Syrian", "Grills"]
 *               location:
 *                 type: "Point"
 *                 coordinates: [31.2357, 30.0444]
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *       400:
 *         description: Validation failed
 *       409:
 *         description: Restaurant slug already exists
 */

router.post(
  '/',
  createRestaurantValidation,
  validateRequest,
  restaurantController.createRestaurant
);

router.get(
  '/',
  getRestaurantsValidation,
  validateRequest,
  restaurantController.getRestaurants
);

router.get(
  '/nearby',
  getNearbyRestaurantsValidation,
  validateRequest,
  restaurantController.getNearbyRestaurants
);

router.get(
  '/:identifier',
  getRestaurantByIdentifierValidation,
  validateRequest,
  restaurantController.getRestaurantByIdentifier
);

module.exports = router;