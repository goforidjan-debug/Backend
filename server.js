import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import dashboardRoutes from "./routes/dashboardRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";

import "./scheduler/postScheduler.js";

dotenv.config();

const app = express();
app.use(cors());

/**
 * SHOPIFY RAW BODY PARSER
 * Must come BEFORE express.json()
 * Accepts any content type (*/*)
 * Ensures req.rawBody is always available
 */
app.use(
  "/webhooks/shopify",
  express.raw({ type: "*/*" }),
  (req, res, next) => {
    req.rawBody = req.body ? req.body.toString("utf8") : "";
    next();
  }
);

// Normal JSON parser for the rest of the app
app.use(express.json());

// ROUTES
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/posts", postRoutes);

// Webhooks route
app.use("/webhooks", webhookRoutes);

// MONGO CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
