import express from "express";
import { CommentController } from "../../controllers/index.js";
import { authenticateJwt } from "../../middlewares/jwt-middleware.js";

const router = express.Router();

/**
 * @route   POST /api/v1/comments
 * @desc    Create a comment on a tweet or reply to a comment
 * @access  Protected
 */
router.post("/", authenticateJwt, (req, res) =>
  CommentController.createComment(req, res)
);

/**
 * @route   GET /api/v1/comments/tweet/:tweetId
 * @desc    Get all top-level comments for a tweet
 * @access  Public
 */
router.get("/tweet/:tweetId", (req, res) =>
  CommentController.getCommentsByTweet(req, res)
);

/**
 * @route   GET /api/v1/comments/:commentId/replies
 * @desc    Get replies for a specific comment
 * @access  Public
 */
router.get("/:commentId/replies", (req, res) =>
  CommentController.getReplies(req, res)
);

export default router;
