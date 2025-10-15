import { UserRepository } from "../repository/index.js";
import logger from "../config/logger-config.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(userData) {
    try {
      // Check if email or username already exists
      const existingEmailUser = await this.userRepository.findByEmail(
        userData.email
      );
      if (existingEmailUser) {
        throw new Error("Email is already in use");
      }

      const existingUsernameUser = await this.userRepository.findByUsername(
        userData.username
      );
      if (existingUsernameUser) {
        throw new Error("Username is already taken");
      }

      const user = await this.userRepository.create(userData);
      logger.info(`✅ User registered successfully with ID: ${user._id}`);
      return user;
    } catch (error) {
      logger.error("❌ Failed to register user", error);
      throw error;
    }
  }

  async authenticateUser(email, password) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        logger.warn(`⚠️ Authentication failed: no user with email ${email}`);
        return null;
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        logger.warn(
          `⚠️ Authentication failed: incorrect password for email ${email}`
        );
        return null;
      }

      logger.info(`✅ User authenticated: ${email}`);
      return user;
    } catch (error) {
      logger.error("❌ Error during user authentication", error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        logger.warn(`⚠️ User not found with ID: ${id}`);
      }
      return user;
    } catch (error) {
      logger.error(`❌ Error fetching user by ID: ${id}`, error);
      throw error;
    }
  }

  async updateUser(id, updateData) {
    try {
      const updatedUser = await this.userRepository.updateById(id, updateData);
      if (!updatedUser) {
        logger.warn(`⚠️ User not found for update with ID: ${id}`);
      } else {
        logger.info(`✅ User updated successfully: ${id}`);
      }
      return updatedUser;
    } catch (error) {
      logger.error(`❌ Error updating user: ${id}`, error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const deletedUser = await this.userRepository.deleteById(id);
      if (!deletedUser) {
        logger.warn(`⚠️ User not found for deletion with ID: ${id}`);
      } else {
        logger.info(`✅ User deleted successfully: ${id}`);
      }
      return deletedUser;
    } catch (error) {
      logger.error(`❌ Error deleting user: ${id}`, error);
      throw error;
    }
  }
}

export default UserService;
