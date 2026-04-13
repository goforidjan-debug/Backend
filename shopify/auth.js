import { shopify } from "./api.js";
import Shop from "./shopModels.js";

export async function verifyShopifySession(req, res, next) {
  try {
    const shop = req.headers["x-shopify-shop-domain"];

    if (!shop) {
      return res.status(401).json({ error: "Missing shop domain" });
    }

    const shopData = await Shop.findOne({ shop });

    if (!shopData || !shopData.accessToken) {
      return res.status(401).json({ error: "Shop not authenticated" });
    }

    req.shop = shop;
    req.accessToken = shopData.accessToken;

    next();
  } catch (err) {
    console.log("Auth error:", err);
    res.status(500).json({ error: "Authentication failed" });
  }
}

export async function handleOAuthCallback(req, res) {
  try {
    const { shop, accessToken } = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    await Shop.findOneAndUpdate(
      { shop },
      { shop, accessToken },
      { upsert: true }
    );

    const redirectUrl = `${process.env.FRONTEND_URL}/?shop=${shop}`;
    return res.redirect(redirectUrl);
  } catch (err) {
    console.log("OAuth callback error:", err);
    res.status(500).send("OAuth failed");
  }
}