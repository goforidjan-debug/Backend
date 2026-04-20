// controllers/webhookController.js

export const handleShopifyWebhook = async (req, res) => {
  try {
    const event = req.headers["x-shopify-topic"];
    const shop = req.headers["x-shopify-shop-domain"];
    const payload = req.body;

    console.log("📬 Webhook received:");
    console.log("Event:", event);
    console.log("Shop:", shop);
    console.log("Payload:", payload);

    // TODO: Insert your AGM Auto-Poster logic here
    // Example:
    // if (event === "products/create") {
    //   await autoPoster.handleNewProduct(payload);
    // }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).send("Webhook processing failed");
  }
};
