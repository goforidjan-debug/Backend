import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    shop: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const MediaAsset = mongoose.model("MediaAsset", mediaSchema);

export default MediaAsset;