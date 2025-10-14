import Hashtag from "../models/hashtag.js";
import logger from "../config/logger-config.js";

class HashtagRepository {
  async createHashtag(data) {
    try {
      const hashtag = new Hashtag(data);
      const savedHashtag = await hashtag.save();
      logger.info("Hashtag created", { hashtagId: savedHashtag._id });
      return savedHashtag;
    } catch (error) {
      logger.error("Failed to create hashtag", error);
      throw error;
    }
  }

  async bulkCreateHashtags(tagTexts = [], tweetId) {
    try {
      if (!tagTexts.length) return;

      const hashtagsToCreate = tagTexts.map((text) => ({
        text,
        tweets: tweetId ? [tweetId] : [],
      }));

      const result = await Hashtag.insertMany(hashtagsToCreate, {
        ordered: false,
      });
      logger.info(`Bulk created ${result.length} hashtags`);
      return result;
    } catch (error) {
      if (error.code === 11000) {
        logger.warn("Some hashtags already exist, duplicates skipped");
        return [];
      }
      logger.error("Error bulk creating hashtags", error);
      throw error;
    }
  }

  async getHashtagById(id) {
    try {
      const hashtag = await Hashtag.findById(id).exec();
      if (!hashtag) {
        logger.warn(`Hashtag not found with ID: ${id}`);
      }
      return hashtag;
    } catch (error) {
      logger.error(`Error fetching hashtag with ID: ${id}`, error);
      throw error;
    }
  }

  async getHashtagByText(text) {
    try {
      const hashtag = await Hashtag.findOne({ text }).exec();
      if (!hashtag) {
        logger.warn(`Hashtag not found with text: ${text}`);
      }
      return hashtag;
    } catch (error) {
      logger.error(`Error fetching hashtag with text: ${text}`, error);
      throw error;
    }
  }

  async addTweetToHashtag(tagText, tweetId) {
    try {
      await Hashtag.updateOne(
        { text: tagText },
        { $addToSet: { tweets: tweetId } }
      );
      logger.info(
        `✅ Added Tweet ID ${tweetId} to existing hashtag #${tagText}`
      );
    } catch (error) {
      logger.error("❌ Error adding tweet to existing hashtag", error);
      throw error;
    }
  }
}

export default HashtagRepository;
