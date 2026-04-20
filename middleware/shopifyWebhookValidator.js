// middleware/shopifyWebhookValidator.js
import crypto from "crypto";

export const verifyShopifyWebhook = (req, res, next) => {
  try {
    const hmacHeader = req.headers["x-shopify-hmac-sha256"];
    const rawBody = req.rawBody; // We will attach this in server.js

    const digest = crypto
      .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
      .update(rawBody, "utf8")
      .digest("base64");

    if (digest !== hmacHeader) {
      console.log("❌ Invalid Shopify HMAC");
      return res.status(401).send("Unauthorized");
    }

    next();
  } catch (error) {
    console.error("HMAC validation error:", error);
    res.status(400).send("Invalid webhook");
  }
};
