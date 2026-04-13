import PostLog from "../models/PostLog.js";
import MediaAsset from "../models/MediaAsset.js";

export async function getDashboardStats(req, res) {
  try {
    const shop = req.shop;

    const totalPosts = await PostLog.countDocuments({ shop });
    const totalMedia = await MediaAsset.countDocuments({ shop });

    res.json({
      totalPosts,
      totalMedia,
    });
  } catch (err) {
    console.log("Dashboard stats error:", err);
    res.status(500).json({ error: "Failed to load dashboard stats" });
  }
}

export async function getRecentPosts(req, res) {
  try {
    const shop = req.shop;

    const posts = await PostLog.find({ shop })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(posts);
  } catch (err) {
    console.log("Recent posts error:", err);
    res.status(500).json({ error: "Failed to load recent posts" });
  }
}