import { StatusCodes } from "http-status-codes";
import { LikeService } from "../services/index.js";
import logger from "../config/logger-config.js";

const likeService = new LikeService();

class LikeController {
  /**
   * Toggle like/unlike on a tweet or comment
   * POST /api/v1/likes/toggle
   *
   * Request Body:
   * {
   *   likeableId: string,
   *   onModel: "Tweet" | "Comment",
   *   userId: string
   * }
   */
  async toggleLike(req, res) {
    try {
      const { likeableId, onModel, userId } = req.body;
      if (!likeableId || !onModel || !userId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "likeableId, onModel and userId are required",
        });
      }

      const result = await likeService.toggleLike(likeableId, userId, onModel);
      return res.status(StatusCodes.OK).json({ success: true, data: result });
    } catch (error) {
      logger.error("Failed to toggle like", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || "Failed to toggle like",
      });
    }
  }

  /**
   * Get like count for a tweet
   * GET /api/v1/likes/tweet/:id/count
   */
  async getTweetLikeCount(req, res) {
    try {
      const tweetId = req.params.id;
      const count = await likeService.getLikeCount(tweetId, "Tweet");
      return res
        .status(StatusCodes.OK)
        .json({ success: true, data: { count } });
    } catch (error) {
      logger.error("Failed to get tweet like count", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || "Could not fetch like count",
      });
    }
  }

  /**
   * Get like count for a comment
   * GET /api/v1/likes/comment/:id/count
   */
  async getCommentLikeCount(req, res) {
    try {
      const commentId = req.params.id;
      const count = await likeService.getLikeCount(commentId, "Comment");
      return res
        .status(StatusCodes.OK)
        .json({ success: true, data: { count } });
    } catch (error) {
      logger.error("Failed to get comment like count", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || "Could not fetch like count",
      });
    }
  }
}

export default new LikeController();
