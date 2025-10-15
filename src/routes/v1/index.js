import express from "express";
import { infoController } from "../../controllers/index.js";
import tweetRoutes from "./tweet-router.js";
import userRoutes from "./user-routes.js";
import likeRoutes from "./like-router.js";
import commentRoutes from "./comment-router.js";

const router = express.Router();

router.get("/info", infoController.info);

router.use("/tweets", tweetRoutes);
router.use("/users", userRoutes);
router.use("/likes", likeRoutes);
router.use("/comments", commentRoutes);

export default router;
