import { StatusCodes } from "http-status-codes";
import { CommentService } from "../services/index.js";
import logger from "../config/logger-config.js";

const commentService = new CommentService();

class CommentController {
  /**
   * Create a comment on a tweet or reply to a comment
   * POST /api/v1/comments
   *
   * Request Body:
   * {
   *   content: string,
   *   tweet: string,            // Tweet ID
   *   user: string,             // User ID
   *   parentComment?: string    // Optional parent comment ID (for replies)
   * }
   */
  async createComment(req, res) {
    try {
      const { content, tweet, user, parentComment } = req.body;

      if (!content || !tweet || !user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "content, tweet and user are required",
        });
      }

      const commentData = { content, tweet, user };
      if (parentComment) commentData.parentComment = parentComment;

      const comment = await commentService.createComment(commentData);
      return res
        .status(StatusCodes.CREATED)
        .json({ success: true, data: comment });
    } catch (error) {
      logger.error("Failed to create comment", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || "Failed to create comment",
      });
    }
  }

  /**
   * Get top-level comments for a tweet
   * GET /api/v1/comments/tweet/:tweetId
   */
  async getCommentsByTweet(req, res) {
    try {
      const tweetId = req.params.tweetId;
      const comments = await commentService.getCommentsByTweet(tweetId);
      return res.status(StatusCodes.OK).json({ success: true, data: comments });
    } catch (error) {
      logger.error("Failed to get comments by tweet", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || "Could not fetch comments",
      });
    }
  }

  /**
   * Get replies for a comment
   * GET /api/v1/comments/:commentId/replies
   */
  async getReplies(req, res) {
    try {
      const parentCommentId = req.params.commentId;
      const replies = await commentService.getReplies(parentCommentId);
      return res.status(StatusCodes.OK).json({ success: true, data: replies });
    } catch (error) {
      logger.error("Failed to get replies", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || "Could not fetch replies",
      });
    }
  }
}

export default new CommentController();
