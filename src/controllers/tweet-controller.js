import { StatusCodes } from "http-status-codes";
import { TweetService } from "../services/index.js";
import logger from "../config/logger-config.js";

const tweetService = new TweetService();

class TweetController {
  /**
   * Create a new tweet
   * POST /api/v1/tweets
   *
   * Request Body:
   * {
   *   content: string,    // Required: text content of the tweet, can include hashtags
   *   // other optional fields can be added here
   * }
   */
  async createTweet(req, res) {
    try {
      const tweet = await tweetService.createTweet(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json({ success: true, data: tweet });
    } catch (error) {
      logger.error("Failed to create tweet", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Failed to create tweet" });
    }
  }

  /**
   * Get a tweet by its ID
   * GET /api/v1/tweets/:id
   *
   * URL Params:
   * - id: string (MongoDB ObjectId) - ID of the tweet to fetch
   */
  async getTweetById(req, res) {
    try {
      const { id } = req.params;
      const tweet = await tweetService.getTweetById(id);

      if (!tweet) {
        logger.warn(`Tweet not found with ID: ${id}`);
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ success: false, message: "Tweet not found" });
      }

      return res.status(StatusCodes.OK).json({ success: true, data: tweet });
    } catch (error) {
      logger.error("Error fetching tweet by ID", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Failed to fetch tweet" });
    }
  }

  /**
   * Get all tweets with pagination
   * GET /api/v1/tweets?limit=number&skip=number
   *
   * Query Parameters:
   * - limit: number (optional, default 50) - max tweets to return
   * - skip: number (optional, default 0) - number of tweets to skip
   */
  async getAllTweets(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const skip = parseInt(req.query.skip) || 0;

      const tweets = await tweetService.getAllTweets(limit, skip);

      return res.status(StatusCodes.OK).json({ success: true, data: tweets });
    } catch (error) {
      logger.error("Failed to fetch tweets", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Failed to fetch tweets" });
    }
  }

  /**
   * Update a tweet by its ID
   * PUT /api/v1/tweets/:id
   *
   * URL Params:
   * - id: string - ID of the tweet to update
   *
   * Request Body:
   * {
   *   content?: string,   // optional new content of the tweet
   *   // other fields can be updated as well
   * }
   */
  async updateTweet(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedTweet = await tweetService.updateTweet(id, updateData);

      if (!updatedTweet) {
        logger.warn(`Tweet to update not found with ID: ${id}`);
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ success: false, message: "Tweet not found" });
      }

      return res
        .status(StatusCodes.OK)
        .json({ success: true, data: updatedTweet });
    } catch (error) {
      logger.error("Error updating tweet", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Failed to update tweet" });
    }
  }

  /**
   * Delete a tweet by its ID
   * DELETE /api/v1/tweets/:id
   *
   * URL Params:
   * - id: string - ID of the tweet to delete
   */
  async deleteTweet(req, res) {
    try {
      const { id } = req.params;
      const deleted = await tweetService.deleteTweet(id);

      if (!deleted) {
        logger.warn(`Tweet to delete not found with ID: ${id}`);
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ success: false, message: "Tweet not found" });
      }

      return res
        .status(StatusCodes.OK)
        .json({ success: true, message: "Tweet deleted successfully" });
    } catch (error) {
      logger.error("Error deleting tweet", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Failed to delete tweet" });
    }
  }
}

export default new TweetController();
