const express = require('express');

const {
  followRestaurantController,
  getUserFollowedRestaurantsController,
  getRestaurantFollowersController,
} = require('./follow.controller');

const {
  followRestaurantValidation,
  getUserFollowedRestaurantsValidation,
  getRestaurantFollowersValidation,
} = require('./follow.validation');

const validateRequest = require('../../middlewares/validateRequest.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Follows
 *   description: User-Restaurant follow relationship APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Follow:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "665f4b7c2f1a9c0012a98765"
 *         user:
 *           type: string
 *           description: User MongoDB ObjectId.
 *           example: "665f4b7c2f1a9c0012a54321"
 *         restaurant:
 *           type: string
 *           description: Restaurant MongoDB ObjectId.
 *           example: "665f4b7c2f1a9c0012a12345"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-05-23T10:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-05-23T10:00:00.000Z"
 *
 *     FollowRestaurantRequest:
 *       type: object
 *       required:
 *         - userId
 *         - restaurantId
 *       properties:
 *         userId:
 *           type: string
 *           description: User MongoDB ObjectId.
 *           example: "665f4b7c2f1a9c0012a54321"
 *         restaurantId:
 *           type: string
 *           description: Restaurant MongoDB ObjectId.
 *           example: "665f4b7c2f1a9c0012a12345"
 */

/**
 * @swagger
 * /api/follows:
 *   post:
 *     summary: Follow a restaurant
 *     description: Create a follow relationship between a user and a restaurant. The same user cannot follow the same restaurant twice.
 *     tags: [Follows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FollowRestaurantRequest'
 *     responses:
 *       201:
 *         description: Restaurant followed successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Follow'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User or restaurant not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: User already follows this restaurant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  '/',
  followRestaurantValidation,
  validateRequest,
  followRestaurantController
);

/**
 * @swagger
 * /api/follows/users/{userId}/restaurants:
 *   get:
 *     summary: Get restaurants followed by a user
 *     description: Retrieve all restaurants followed by a specific user.
 *     tags: [Follows]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User MongoDB ObjectId.
 *         example: "665f4b7c2f1a9c0012a54321"
 *     responses:
 *       200:
 *         description: User followed restaurants fetched successfully
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  '/users/:userId/restaurants',
  getUserFollowedRestaurantsValidation,
  validateRequest,
  getUserFollowedRestaurantsController
);

/**
 * @swagger
 * /api/follows/restaurants/{identifier}/users:
 *   get:
 *     summary: Get restaurant followers
 *     description: Retrieve all users following a restaurant by restaurant MongoDB ObjectId or slug.
 *     tags: [Follows]
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
 *         description: Restaurant followers fetched successfully
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
 *                         $ref: '#/components/schemas/User'
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
  '/restaurants/:identifier/users',
  getRestaurantFollowersValidation,
  validateRequest,
  getRestaurantFollowersController
);

module.exports = router;