import { LikeRepository } from "../repository/index.js";
import Tweet from "../models/tweet.js";
import Comment from "../models/comment.js";
import logger from "../config/logger-config.js";

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  /**
   * Toggle like/unlike on a likeable (Tweet or Comment)
   * @param {string} likeableId - ID of the tweet or comment
   * @param {string} userId - ID of the user
   * @param {"Tweet" | "Comment"} onModel - What is being liked
   */
  async toggleLike(likeableId, userId, onModel) {
    try {
      const existingLike = await this.likeRepository.findByUserAndLikeable(
        userId,
        likeableId,
        onModel
      );

      if (existingLike) {
        await this.likeRepository.deleteByUserAndLikeable(
          userId,
          likeableId,
          onModel
        );
        logger.info(
          `👍 Unliked ${onModel.toLowerCase()} ${likeableId} by user ${userId}`
        );
        return { liked: false };
      }

      // Validate existence of likeable
      let likeableModel = onModel === "Tweet" ? Tweet : Comment;
      const likeable = await likeableModel.findById(likeableId);

      if (!likeable) {
        logger.warn(`🚫 ${onModel} not found with ID: ${likeableId}`);
        throw new Error(`${onModel} not found`);
      }

      const newLike = await this.likeRepository.create({
        user: userId,
        likeable: likeableId,
        onModel,
      });

      logger.info(
        `❤️ Liked ${onModel.toLowerCase()} ${likeableId} by user ${userId}`
      );
      return { liked: true, like: newLike };
    } catch (error) {
      logger.error(`❌ Failed to toggle like on ${onModel}`, error);
      throw error;
    }
  }

  /**
   * Get like count for a likeable (Tweet or Comment)
   */
  async getLikeCount(likeableId, onModel) {
    try {
      const count = await this.likeRepository.countLikes(likeableId, onModel);
      return count;
    } catch (error) {
      logger.error(`❌ Failed to count likes for ${onModel}`, error);
      throw error;
    }
  }
}

export default LikeService;
