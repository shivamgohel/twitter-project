import express from "express";
import { UserController } from "../../controllers/index.js";

const router = express.Router();

/**
 * @route   POST /api/v1/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", (req, res) => UserController.registerUser(req, res));

/**
 * @route   POST /api/v1/users/login
 * @desc    Authenticate user (login)
 * @access  Public
 */
router.post("/login", (req, res) => UserController.loginUser(req, res));

/**
 * @route   GET /api/v1/users/:id
 * @desc    Get a user by ID
 * @access  Public
 */
router.get("/:id", (req, res) => UserController.getUserById(req, res));

/**
 * @route   PUT /api/v1/users/:id
 * @desc    Update a user by ID
 * @access  Public
 */
router.put("/:id", (req, res) => UserController.updateUser(req, res));

/**
 * @route   DELETE /api/v1/users/:id
 * @desc    Delete a user by ID
 * @access  Public
 */
router.delete("/:id", (req, res) => UserController.deleteUser(req, res));

export default router;
