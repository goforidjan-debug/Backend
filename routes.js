import express from "express";
import { verifyShopifySession } from "./shopify/auth.js";
import {
  getDashboardStats,
  getRecentPosts
} from "./controllers/dashboardController.js";
import {
  uploadMedia,
  getMedia
} from "./controllers/mediaController.js";
import {
  createPost,
  getScheduledPosts
} from "./controllers/postController.js";

const router = express.Router();

router.get("/dashboard", verifyShopifySession, getDashboardStats);
router.get("/dashboard/recent-posts", verifyShopifySession, getRecentPosts);

router.post("/media/upload", verifyShopifySession, uploadMedia);
router.get("/media", verifyShopifySession, getMedia);

router.post("/posts/create", verifyShopifySession, createPost);
router.get("/posts/scheduled", verifyShopifySession, getScheduledPosts);

export default router;