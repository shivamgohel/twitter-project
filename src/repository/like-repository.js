import Like from "../models/like.js";
import CrudRepository from "./crud-repository.js";
import logger from "../config/logger-config.js";

class LikeRepository extends CrudRepository {
  constructor() {
    super(Like);
  }

  async findByUserAndLikeable(userId, likeableId, onModel) {
    try {
      return await Like.findOne({
        user: userId,
        likeable: likeableId,
        onModel: onModel,
      });
    } catch (error) {
      logger.error("Error finding like by user and likeable", error);
      throw error;
    }
  }

  async deleteByUserAndLikeable(userId, likeableId, onModel) {
    try {
      return await Like.findOneAndDelete({
        user: userId,
        likeable: likeableId,
        onModel: onModel,
      });
    } catch (error) {
      logger.error("Error deleting like", error);
      throw error;
    }
  }

  async countLikes(likeableId, onModel) {
    try {
      return await Like.countDocuments({ likeable: likeableId, onModel });
    } catch (error) {
      logger.error("Error counting likes", error);
      throw error;
    }
  }
}

export default LikeRepository;
