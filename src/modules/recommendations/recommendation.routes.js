const express = require('express');

const {
  getRestaurantRecommendationsController,
} = require('./recommendation.controller');

const {
  getRestaurantRecommendationsValidation,
} = require('./recommendation.validation');

const validateRequest = require('../../middlewares/validateRequest.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: Restaurant recommendation APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RestaurantRecommendationResponse:
 *       type: object
 *       properties:
 *         matchedUsers:
 *           type: array
 *           description: Users who share at least one favorite cuisine with the requested user.
 *           items:
 *             $ref: '#/components/schemas/User'
 *         recommendedRestaurants:
 *           type: array
 *           description: Restaurants followed by the matched users.
 *           items:
 *             $ref: '#/components/schemas/Restaurant'
 */

/**
 * @swagger
 * /api/recommendations/users/{userId}/restaurants:
 *   get:
 *     summary: Get restaurant recommendations for a user
 *     description: >
 *       Recommend restaurants for a user by finding other users who share similar favorite cuisines,
 *       then aggregating restaurants followed by those matched users using MongoDB Aggregation Pipeline.
 *     tags: [Recommendations]
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
 *         description: Restaurant recommendations fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/RestaurantRecommendationResponse'
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
  getRestaurantRecommendationsValidation,
  validateRequest,
  getRestaurantRecommendationsController
);

module.exports = router;