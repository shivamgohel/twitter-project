import { StatusCodes } from "http-status-codes";
import { UserService } from "../services/index.js";
import logger from "../config/logger-config.js";

const userService = new UserService();

class UserController {
  /**
   * Register a new user
   * POST /api/v1/users/register
   *
   * Request Body:
   * {
   *   username: string,
   *   email: string,
   *   password: string,
   *   name: string,
   *   bio?: string,
   *   avatarUrl?: string
   * }
   */
  async registerUser(req, res) {
    try {
      const user = await userService.registerUser(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json({ success: true, data: user });
    } catch (error) {
      logger.error("Failed to register user", error);
      // You can customize error message based on error type here
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "Registration failed",
      });
    }
  }

  /**
   * Authenticate user (login)
   * POST /api/v1/users/login
   *
   * Request Body:
   * {
   *   email: string,
   *   password: string
   * }
   */
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const result = await userService.authenticateUser(email, password);

      if (!result) {
        logger.warn(`Authentication failed for email: ${email}`);
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ success: false, message: "Invalid email or password" });
      }

      const { user, token } = result;

      // Remove password before sending user object
      const userObject = user.toObject();
      delete userObject.password;

      return res.status(StatusCodes.OK).json({
        success: true,
        data: {
          user: userObject,
          token,
        },
      });
    } catch (error) {
      logger.error("Error during user login", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Login failed" });
    }
  }

  /**
   * Get user by ID
   * GET /api/v1/users/:id
   */
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      if (!user) {
        logger.warn(`User not found with ID: ${id}`);
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ success: false, message: "User not found" });
      }

      return res.status(StatusCodes.OK).json({ success: true, data: user });
    } catch (error) {
      logger.error("Error fetching user by ID", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Failed to fetch user" });
    }
  }

  /**
   * Update user by ID
   * PUT /api/v1/users/:id
   *
   * Request Body:
   * {
   *   username?: string,
   *   email?: string,
   *   password?: string,
   *   name?: string,
   *   bio?: string,
   *   avatarUrl?: string
   * }
   */
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedUser = await userService.updateUser(id, updateData);

      if (!updatedUser) {
        logger.warn(`User to update not found with ID: ${id}`);
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ success: false, message: "User not found" });
      }

      return res
        .status(StatusCodes.OK)
        .json({ success: true, data: updatedUser });
    } catch (error) {
      logger.error("Error updating user", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Failed to update user" });
    }
  }

  /**
   * Delete user by ID
   * DELETE /api/v1/users/:id
   */
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await userService.deleteUser(id);

      if (!deletedUser) {
        logger.warn(`User to delete not found with ID: ${id}`);
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ success: false, message: "User not found" });
      }

      return res
        .status(StatusCodes.OK)
        .json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      logger.error("Error deleting user", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Failed to delete user" });
    }
  }
}

export default new UserController();
