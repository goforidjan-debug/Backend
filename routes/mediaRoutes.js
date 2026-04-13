import express from "express";
import { uploadMedia, getMedia } from "../controllers/mediaController.js";

const router = express.Router();

router.post("/upload", uploadMedia);
router.get("/", getMedia);

export default router;