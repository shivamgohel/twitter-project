import express from "express";
import { TweetController } from "../../controllers/index.js";

const router = express.Router();

/**
 * @route   POST /v1/api/tweets
 * @desc    Create a new tweet
 * @access  Public
 */
router.post("/", (req, res) => TweetController.createTweet(req, res));

/**
 * @route   GET /v1/api/tweets/:id
 * @desc    Get a tweet by ID
 * @access  Public
 */
router.get("/:id", (req, res) => TweetController.getTweetById(req, res));

/**
 * @route   GET /v1/api/tweets
 * @desc    Get all tweets with pagination
 * @access  Public
 */
router.get("/", (req, res) => TweetController.getAllTweets(req, res));

/**
 * @route   PUT /v1/api/tweets/:id
 * @desc    Update a tweet by ID
 * @access  Public
 */
router.put("/:id", (req, res) => TweetController.updateTweet(req, res));

/**
 * @route   DELETE /v1/api/tweets/:id
 * @desc    Delete a tweet by ID
 * @access  Public
 */
router.delete("/:id", (req, res) => TweetController.deleteTweet(req, res));

export default router;
