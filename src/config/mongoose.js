import mongoose from "mongoose";

import serverConfig from "./server-config.js";
import logger from "./logger-config.js";

const connectToMongo = async () => {
  try {
    await mongoose.connect(serverConfig.MONGO_URI);
    logger.info("✅ Connected to MongoDB with Mongoose");
  } catch (error) {
    logger.error("❌ Mongoose connection error:", error);
    process.exit(1);
  }
};

export default connectToMongo;
