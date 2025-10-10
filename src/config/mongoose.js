const mongoose = require("mongoose");
const serverConfig = require("./server-config");
const logger = require("./logger-config");

const connectToMongo = async () => {
  try {
    await mongoose.connect(serverConfig.MONGO_URI);
    logger.info("✅ Connected to MongoDB with Mongoose");
  } catch (error) {
    logger.error("❌ Mongoose connection error:", error);
    process.exit(1);
  }
};

module.exports = connectToMongo;
