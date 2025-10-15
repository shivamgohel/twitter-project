import { CommentRepository } from "../repository/index.js";
import Tweet from "../models/tweet.js";
import logger from "../config/logger-config.js";

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  /**
   * Create a comment on a tweet or a comment
   * @param {Object} commentData - The comment details
   * @param {string} commentData.content - Text content of the comment
   * @param {string} commentData.tweet - Tweet ID the comment belongs to
   * @param {string} commentData.user - User ID who made the comment
   * @param {string|null} [commentData.parentComment] - Parent comment ID if this is a reply
   */
  async createComment(commentData) {
    try {
      // Validate tweet existence before commenting
      const tweetExists = await Tweet.exists({ _id: commentData.tweet });
      if (!tweetExists) {
        throw new Error("Tweet not found");
      }

      if (commentData.parentComment) {
        const parentCommentExists = await this.commentRepository.findById(
          commentData.parentComment
        );
        if (!parentCommentExists) {
          throw new Error("Parent comment not found");
        }
      }

      const comment = await this.commentRepository.create(commentData);
      logger.info(`📝 Comment created with ID: ${comment._id}`);
      return comment;
    } catch (error) {
      logger.error("❌ Failed to create comment", error);
      throw error;
    }
  }

  /**
   * Get all comments for a tweet (top-level comments, i.e., parentComment == null)
   * @param {string} tweetId - The ID of the tweet
   */
  async getCommentsByTweet(tweetId) {
    try {
      // Fetch comments where parentComment is null (top-level)
      const comments = await this.commentRepository.findByTweetId(tweetId);
      return comments.filter((comment) => !comment.parentComment);
    } catch (error) {
      logger.error("❌ Failed to fetch comments by tweet", error);
      throw error;
    }
  }

  /**
   * Get replies for a given comment
   * @param {string} parentCommentId - The ID of the comment to get replies for
   */
  async getReplies(parentCommentId) {
    try {
      const replies = await this.commentRepository.findReplies(parentCommentId);
      return replies;
    } catch (error) {
      logger.error("❌ Failed to fetch replies", error);
      throw error;
    }
  }
}

export default CommentService;
