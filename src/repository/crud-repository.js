import logger from "../config/logger-config.js";

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const doc = await this.model.create(data);
      logger.info(`[CREATE] Document created in ${this.model.modelName}`, {
        id: doc._id,
      });
      return doc;
    } catch (error) {
      logger.error(
        `[CREATE] Error creating document in ${this.model.modelName}`,
        error
      );
      throw error;
    }
  }

  async findById(id) {
    try {
      const doc = await this.model.findById(id);
      if (!doc) {
        logger.warn(
          `[FIND] Document not found in ${this.model.modelName} with id: ${id}`
        );
      } else {
        logger.info(`[FIND] Document found in ${this.model.modelName}`, { id });
      }
      return doc;
    } catch (error) {
      logger.error(
        `[FIND] Error finding document in ${this.model.modelName} with id: ${id}`,
        error
      );
      throw error;
    }
  }

  async findAll(filter = {}, options = {}) {
    try {
      const { limit = 50, skip = 0, sort = "-createdAt" } = options;
      const docs = await this.model
        .find(filter)
        .limit(limit)
        .skip(skip)
        .sort(sort);
      logger.info(
        `[FIND ALL] Retrieved documents from ${this.model.modelName}`,
        { count: docs.length }
      );
      return docs;
    } catch (error) {
      logger.error(
        `[FIND ALL] Error retrieving documents from ${this.model.modelName}`,
        error
      );
      throw error;
    }
  }

  async updateById(id, updateData) {
    try {
      const updatedDoc = await this.model.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedDoc) {
        logger.warn(
          `[UPDATE] Document not found in ${this.model.modelName} with id: ${id}`
        );
      } else {
        logger.info(`[UPDATE] Document updated in ${this.model.modelName}`, {
          id,
        });
      }
      return updatedDoc;
    } catch (error) {
      logger.error(
        `[UPDATE] Error updating document in ${this.model.modelName} with id: ${id}`,
        error
      );
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const deletedDoc = await this.model.findByIdAndDelete(id);
      if (!deletedDoc) {
        logger.warn(
          `[DELETE] Document not found in ${this.model.modelName} with id: ${id}`
        );
      } else {
        logger.info(`[DELETE] Document deleted in ${this.model.modelName}`, {
          id,
        });
      }
      return deletedDoc;
    } catch (error) {
      logger.error(
        `[DELETE] Error deleting document in ${this.model.modelName} with id: ${id}`,
        error
      );
      throw error;
    }
  }
}

export default CrudRepository;
