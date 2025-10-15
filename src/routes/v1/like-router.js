import express from "express";
import { LikeController } from "../../controllers/index.js";
import { authenticateJwt } from "../../middlewares/jwt-middleware.js";

const router = express.Router();

/**
 * @route   POST /api/v1/likes/toggle
 * @desc    Toggle like/unlike on a tweet or comment
 * @access  Protected
 */
router.post("/toggle", authenticateJwt, (req, res) =>
  LikeController.toggleLike(req, res)
);

/**
 * @route   GET /api/v1/likes/tweet/:id/count
 * @desc    Get like count for a tweet
 * @access  Public
 */
router.get("/tweet/:id/count", (req, res) =>
  LikeController.getTweetLikeCount(req, res)
);

/**
 * @route   GET /api/v1/likes/comment/:id/count
 * @desc    Get like count for a comment
 * @access  Public
 */
router.get("/comment/:id/count", (req, res) =>
  LikeController.getCommentLikeCount(req, res)
);

export default router;
