import CrudRepository from "./crud-repository.js";
import User from "../models/user.js";
import logger from "../config/logger-config.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    try {
      const user = await this.model.findOne({ email }).select("+password");
      if (!user) {
        logger.warn(`[UserRepository] No user found with email: ${email}`);
      } else {
        logger.info(`[UserRepository] Found user with email: ${email}`);
      }
      return user;
    } catch (error) {
      logger.error(
        `[UserRepository] Error finding user by email: ${email}`,
        error
      );
      throw error;
    }
  }

  async findByUsername(username) {
    try {
      const user = await this.model.findOne({ username });
      if (!user) {
        logger.warn(
          `[UserRepository] No user found with username: ${username}`
        );
      } else {
        logger.info(`[UserRepository] Found user with username: ${username}`);
      }
      return user;
    } catch (error) {
      logger.error(
        `[UserRepository] Error finding user by username: ${username}`,
        error
      );
      throw error;
    }
  }
}

export default UserRepository;
