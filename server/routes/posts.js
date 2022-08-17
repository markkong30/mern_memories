import express from "express";
import {
	getPosts,
	createPost,
	updatePost,
	getSpecificPost,
	deletePost,
	likePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getSpecificPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.patch("/:id/like", auth, likePost);
router.delete("/:id", auth, deletePost);

export default router;
