import express from "express";
import { createPost, getScheduledPosts, deletePost } from '../controllers/postController.js';

const router = express.Router();

router.post("/create", createPost);
router.get("/", getPosts);
router.delete("/:id", deletePost);

export default router;