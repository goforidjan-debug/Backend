import express from "express";
import { handleShopifyWebhook } from "../controllers/webhookController.js";
import { verifyShopifyWebhook } from "../middleware/shopifyWebhookValidator.js";

const router = express.Router();

// Shopify sends POST requests here
router.post("/shopify", verifyShopifyWebhook, handleShopifyWebhook);

export default router;
