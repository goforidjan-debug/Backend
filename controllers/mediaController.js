import MediaAsset from "../models/MediaAsset.js";

export async function uploadMedia(req, res) {
  try {
    const { url } = req.body;
    const shop = req.shop;

    if (!url) {
      return res.status(400).json({ error: "Media URL required" });
    }

    const media = await MediaAsset.create({
      shop,
      url,
    });

    res.json(media);
  } catch (err) {
    console.log("Media upload error:", err);
    res.status(500).json({ error: "Failed to upload media" });
  }
}

export async function getMedia(req, res) {
  try {
    const shop = req.shop;

    const media = await MediaAsset.find({ shop }).sort({ createdAt: -1 });

    res.json(media);
  } catch (err) {
    console.log("Get media error:", err);
    res.status(500).json({ error: "Failed to load media" });
  }
}