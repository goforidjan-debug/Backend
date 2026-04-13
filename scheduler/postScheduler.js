import cron from "node-cron";
import SchedulePost from "../models/SchedulePost.js";
import PostLog from "../models/PostLog.js";

// Placeholder posting function — replace with real API integrations later
async function publishToPlatform({ shop, caption, mediaUrl }) {
  return {
    success: true,
    platform: "instagram",
    message: "Post published (placeholder)",
  };
}

async function processScheduledPosts() {
  try {
    const now = new Date();

    const duePosts = await SchedulePost.find({
      status: "pending",
      scheduledFor: { $lte: now },
    });

    if (duePosts.length === 0) return;

    for (const post of duePosts) {
      const { shop, caption, mediaUrl } = post;

      try {
        const result = await publishToPlatform({
          shop,
          caption,
          mediaUrl,
        });

        await PostLog.create({
          shop,
          caption,
          mediaUrl,
          platform: result.platform,
          status: result.success ? "posted" : "failed",
        });

        post.status = "posted";
        await post.save();
      } catch (err) {
        console.log("Scheduler post error:", err);

        await PostLog.create({
          shop,
          caption,
          mediaUrl,
          platform: "instagram",
          status: "failed",
        });
      }
    }
  } catch (err) {
    console.log("Scheduler error:", err);
  }
}

// Runs every minute
cron.schedule("* * * * *", () => {
  console.log("⏱️ Running scheduler...");
  processScheduledPosts();
});