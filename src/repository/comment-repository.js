import Comment from "../models/comment.js";
import CrudRepository from "./crud-repository.js";
import logger from "../config/logger-config.js";

class CommentRepository extends CrudRepository {
  constructor() {
    super(Comment);
  }

  async findByTweetId(tweetId) {
    try {
      return await Comment.find({ tweet: tweetId }).sort({ createdAt: -1 });
    } catch (error) {
      logger.error("Error finding comments by tweet ID", error);
      throw error;
    }
  }

  async findReplies(parentCommentId) {
    try {
      return await Comment.find({ parentComment: parentCommentId }).sort({
        createdAt: 1,
      });
    } catch (error) {
      logger.error("Error finding replies by parent comment ID", error);
      throw error;
    }
  }
}

export default CommentRepository;
