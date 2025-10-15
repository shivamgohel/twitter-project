import express from "express";

import { serverConfig, logger } from "./config/index.js";
import connectToMongo from "./config/mongoose.js";
import apiRoutes from "./routes/index.js";
import "./config/passport-jwt-strategy.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger middleware
app.use((req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.originalUrl}`);

  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    const safeBody = JSON.parse(JSON.stringify(req.body));
    if (safeBody.password) safeBody.password = "***";
    logger.info(`Request Body: ${JSON.stringify(safeBody)}`);
  } else {
    logger.info(`Query Params: ${JSON.stringify(req.query)}`);
  }

  next();
});

// Mount API routes
app.use("/api", apiRoutes);

// Connect to MongoDB, then start server
connectToMongo().then(() => {
  app.listen(serverConfig.PORT, () => {
    logger.info(`Server Started At Port: ${serverConfig.PORT}`);
  });
});
