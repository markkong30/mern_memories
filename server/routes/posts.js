import express from "express";
import {
	getPosts,
	createPost,
	updatePost,
	getSpecificPost,
	deletePost,
	likePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getSpecificPost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.patch("/:id/like", likePost);
router.delete("/:id", deletePost);

export default router;
