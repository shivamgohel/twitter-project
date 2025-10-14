import express from "express";
import { infoController } from "../../controllers/index.js";
import tweetRoutes from "./tweet-router.js";

const router = express.Router();

router.get("/info", infoController.info);

router.use("/tweets", tweetRoutes);

export default router;
