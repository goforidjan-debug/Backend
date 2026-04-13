import mongoose from "mongoose";

const postLogSchema = new mongoose.Schema(
  {
    shop: { type: String, required: true },
    caption: { type: String, required: true },
    mediaUrl: { type: String, required: true },
    platform: { type: String, default: "instagram" },
    status: { type: String, default: "posted" },
  },
  { timestamps: true }
);

const PostLog = mongoose.model("PostLog", postLogSchema);

export default PostLog;