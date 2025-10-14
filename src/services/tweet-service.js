import { TweetRepository, HashtagRepository } from "../repository/index.js";
import logger from "../config/logger-config.js";

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  async createTweet(data) {
    try {
      const content = data.content;

      const hashtags =
        content?.match(/#[\w]+/g)?.map((tag) => tag.slice(1).toLowerCase()) ||
        [];

      // Step 1: Create the tweet first
      const tweet = await this.tweetRepository.createTweet(data);

      // Step 2: Identify existing hashtags
      const existingTags = [];
      for (const tag of hashtags) {
        const existing = await this.hashtagRepository.getHashtagByText(tag);
        if (existing) {
          existingTags.push(tag);
          // Also update existing hashtag with new tweetId
          await this.hashtagRepository.addTweetToHashtag(tag, tweet._id);
        }
      }

      // Step 3: Find which hashtags are new
      const newTags = hashtags.filter((tag) => !existingTags.includes(tag));

      // Step 4: Create new hashtags
      if (newTags.length) {
        await this.hashtagRepository.bulkCreateHashtags(newTags, tweet._id);
        logger.info(`✅ Hashtags created and linked to Tweet ID: ${tweet._id}`);
      }

      return tweet;
    } catch (error) {
      logger.error("❌ Failed to create tweet in service", error);
      throw error;
    }
  }

  async getTweetById(id) {
    try {
      const tweet = await this.tweetRepository.getTweetById(id);
      if (!tweet) {
        logger.warn(`⚠️ Tweet not found in service with ID: ${id}`);
      }
      return tweet;
    } catch (error) {
      logger.error(`❌ Error fetching tweet by ID: ${id}`, error);
      throw error;
    }
  }

  async getAllTweets(limit = 50, skip = 0) {
    try {
      return await this.tweetRepository.getAllTweets(limit, skip);
    } catch (error) {
      logger.error("❌ Failed to fetch tweets in service", error);
      throw error;
    }
  }
  async updateTweet(id, updateData) {
    try {
      const updatedTweet = await this.tweetRepository.updateTweet(
        id,
        updateData
      );
      return updatedTweet;
    } catch (error) {
      logger.error(`❌ Error updating tweet: ${id}`, error);
      throw error;
    }
  }

  async deleteTweet(id) {
    try {
      const deleted = await this.tweetRepository.deleteTweet(id);
      return deleted;
    } catch (error) {
      logger.error(`❌ Error deleting tweet: ${id}`, error);
      throw error;
    }
  }
}

export default TweetService;
