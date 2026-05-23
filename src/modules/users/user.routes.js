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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "665f4b7c2f1a9c0012a54321"
 *         fullName:
 *           type: string
 *           example: "Abdalla Nasser"
 *         favoriteCuisines:
 *           type: array
 *           minItems: 1
 *           items:
 *             type: string
 *           example: ["Asian", "Burgers"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-05-23T10:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-05-23T10:00:00.000Z"
 *
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - fullName
 *         - favoriteCuisines
 *       properties:
 *         fullName:
 *           type: string
 *           example: "Abdalla Nasser"
 *         favoriteCuisines:
 *           type: array
 *           minItems: 1
 *           items:
 *             type: string
 *           example: ["Asian", "Burgers"]
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a user with full name and favorite cuisines.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  '/',
  createUserValidation,
  validateRequest,
  createUserController
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users fetched successfully
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
 */
router.get('/', getUsersController);

/**
 * @swagger
 * /api/users/{identifier}:
 *   get:
 *     summary: Get user details
 *     description: Retrieve user details by MongoDB ObjectId or full name.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: identifier
 *         schema:
 *           type: string
 *         required: true
 *         description: User MongoDB ObjectId or full name.
 *         examples:
 *           objectId:
 *             summary: MongoDB ObjectId
 *             value: "665f4b7c2f1a9c0012a54321"
 *           fullName:
 *             summary: User full name
 *             value: "Abdalla Nasser"
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
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
  '/:identifier',
  getUserByIdentifierValidation,
  validateRequest,
  getUserByIdentifierController
);

module.exports = router;