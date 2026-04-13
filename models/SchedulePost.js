import mongoose from "mongoose";

const schedulePostSchema = new mongoose.Schema(
  {
    shop: { type: String, required: true },
    caption: { type: String, required: true },
    mediaUrl: { type: String, required: true },
    scheduledFor: { type: Date, required: true },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

const SchedulePost = mongoose.model("SchedulePost", schedulePostSchema);

export default SchedulePost;