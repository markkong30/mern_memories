import express from "express";
import { getPosts, createPost, updatePost, getSpecificPost } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getSpecificPost);
router.patch("/:id", updatePost);

export default router;
