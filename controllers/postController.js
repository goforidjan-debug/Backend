import SchedulePost from "../models/SchedulePost.js";
import PostLog from "../models/PostLog.js";

export async function createPost(req, res) {
  try {
    const { caption, mediaUrl, scheduledFor } = req.body;
    const shop = req.shop;

    if (!caption || !mediaUrl || !scheduledFor) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const post = await SchedulePost.create({
      shop,
      caption,
      mediaUrl,
      scheduledFor,
    });

    res.json(post);
  } catch (err) {
    console.log("Create post error:", err);
    res.status(500).json({ error: "Failed to schedule post" });
  }
}

export async function getScheduledPosts(req, res) {
  try {
    const shop = req.shop;

    const posts = await SchedulePost.find({ shop }).sort({
      scheduledFor: 1,
    });

    res.json(posts);
  } catch (err) {
    console.log("Get scheduled posts error:", err);
    res.status(500).json({ error: "Failed to load scheduled posts" });
  }
}