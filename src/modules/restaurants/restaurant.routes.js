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
 * tags:
 *   name: Restaurants
 *   description: Restaurant management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "665f4b7c2f1a9c0012a12345"
 *         name:
 *           type: object
 *           properties:
 *             ar:
 *               type: string
 *               example: "مطعم الشام"
 *             en:
 *               type: string
 *               example: "Al Sham Restaurant"
 *         slug:
 *           type: string
 *           example: "al-sham-restaurant"
 *         cuisines:
 *           type: array
 *           minItems: 1
 *           maxItems: 3
 *           items:
 *             type: string
 *           example: ["Syrian", "Grills"]
 *         location:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               example: "Point"
 *             coordinates:
 *               type: array
 *               description: Coordinates must be in [longitude, latitude] order.
 *               items:
 *                 type: number
 *               example: [31.2357, 30.0444]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-05-23T10:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-05-23T10:00:00.000Z"
 *
 *     CreateRestaurantRequest:
 *       type: object
 *       required:
 *         - name
 *         - slug
 *         - cuisines
 *         - location
 *       properties:
 *         name:
 *           type: object
 *           required:
 *             - ar
 *             - en
 *           properties:
 *             ar:
 *               type: string
 *               example: "مطعم الشام"
 *             en:
 *               type: string
 *               example: "Al Sham Restaurant"
 *         slug:
 *           type: string
 *           example: "al-sham-restaurant"
 *         cuisines:
 *           type: array
 *           minItems: 1
 *           maxItems: 3
 *           items:
 *             type: string
 *           example: ["Syrian", "Grills"]
 *         location:
 *           type: object
 *           required:
 *             - type
 *             - coordinates
 *           properties:
 *             type:
 *               type: string
 *               example: "Point"
 *             coordinates:
 *               type: array
 *               description: Coordinates must be in [longitude, latitude] order.
 *               items:
 *                 type: number
 *               example: [31.2357, 30.0444]
 */

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     description: Create a restaurant with Arabic and English names, unique slug, cuisines, and GeoJSON location.
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRestaurantRequest'
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Restaurant'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Restaurant slug already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  '/',
  createRestaurantValidation,
  validateRequest,
  restaurantController.createRestaurant
);

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Get all restaurants
 *     description: Retrieve all restaurants with optional filtering by cuisine.
 *     tags: [Restaurants]
 *     parameters:
 *       - in: query
 *         name: cuisine
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter restaurants by cuisine.
 *         example: "Asian"
 *     responses:
 *       200:
 *         description: Restaurants fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Restaurant'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  '/',
  getRestaurantsValidation,
  validateRequest,
  restaurantController.getRestaurants
);

/**
 * @swagger
 * /api/restaurants/nearby:
 *   get:
 *     summary: Find nearby restaurants
 *     description: Find restaurants within 1KM radius using MongoDB GeoSpatial query.
 *     tags: [Restaurants]
 *     parameters:
 *       - in: query
 *         name: lng
 *         schema:
 *           type: number
 *         required: true
 *         description: Longitude value.
 *         example: 31.2357
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *         required: true
 *         description: Latitude value.
 *         example: 30.0444
 *     responses:
 *       200:
 *         description: Nearby restaurants fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Restaurant'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  '/nearby',
  getNearbyRestaurantsValidation,
  validateRequest,
  restaurantController.getNearbyRestaurants
);

/**
 * @swagger
 * /api/restaurants/{identifier}:
 *   get:
 *     summary: Get restaurant details
 *     description: Retrieve restaurant details by MongoDB ObjectId or restaurant slug.
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: identifier
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant MongoDB ObjectId or unique slug.
 *         examples:
 *           objectId:
 *             summary: MongoDB ObjectId
 *             value: "665f4b7c2f1a9c0012a12345"
 *           slug:
 *             summary: Restaurant slug
 *             value: "kfc"
 *     responses:
 *       200:
 *         description: Restaurant fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Restaurant'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Restaurant not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  '/:identifier',
  getRestaurantByIdentifierValidation,
  validateRequest,
  restaurantController.getRestaurantByIdentifier
);

module.exports = router;