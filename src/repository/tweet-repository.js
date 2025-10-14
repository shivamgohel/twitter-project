import Tweet from "../models/tweet.js";
import logger from "../config/logger-config.js";

class TweetRepository {
  async createTweet(data) {
    try {
      const tweet = new Tweet(data);
      const savedTweet = await tweet.save();
      logger.info("Tweet created", { tweetId: savedTweet._id });
      return savedTweet;
    } catch (error) {
      logger.error("Failed to create tweet", error);
      throw error;
    }
  }

  async getTweetById(id) {
    try {
      const tweet = await Tweet.findById(id).exec();
      if (!tweet) {
        logger.warn(`Tweet not found with ID: ${id}`);
      }
      return tweet;
    } catch (error) {
      logger.error(`Error fetching tweet with ID: ${id}`, error);
      throw error;
    }
  }

  async getAllTweets(limit = 50, skip = 0) {
    try {
      const tweets = await Tweet.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();

      logger.debug(`Fetched ${tweets.length} tweets`);

      // Log each tweet's ID and content
      tweets.forEach((tweet) => {
        logger.info(
          `Tweet ID: ${tweet._id}, Content: ${tweet.content}, Likes: ${tweet.likes}, Retweets: ${tweet.numberOfRetweets}, Created At: ${tweet.createdAt}`
        );
      });

      return tweets;
    } catch (error) {
      logger.error("Error fetching tweets", error);
      throw error;
    }
  }

  async updateTweet(id, updateData) {
    try {
      const updatedTweet = await Tweet.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedTweet) {
        logger.warn(`Tweet not found for update: ${id}`);
      } else {
        logger.info(`Tweet updated: ${id}`);
      }
      return updatedTweet;
    } catch (error) {
      logger.error(`Failed to update tweet: ${id}`, error);
      throw error;
    }
  }

  async deleteTweet(id) {
    try {
      const deleted = await Tweet.findByIdAndDelete(id);
      if (!deleted) {
        logger.warn(`Tweet not found for deletion: ${id}`);
      } else {
        logger.info(`Tweet deleted: ${id}`);
      }
      return deleted;
    } catch (error) {
      logger.error(`Error deleting tweet: ${id}`, error);
      throw error;
    }
  }
}

export default TweetRepository;
