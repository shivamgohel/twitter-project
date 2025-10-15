import express from "express";
import { infoController } from "../../controllers/index.js";
import tweetRoutes from "./tweet-router.js";
import userRoutes from "./user-routes.js";

const router = express.Router();

router.get("/info", infoController.info);

router.use("/tweets", tweetRoutes);
router.use("/users", userRoutes);

export default router;
