import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

const getPosts = async (req, res) => {
	try {
		const posts = await PostMessage.find();
		res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		res.status(404).json({ message: err.message });
	}
};

const getSpecificPost = async (req, res) => {
	try {
		const post = await PostMessage.findById(req.body);
		res.status(200).json(post);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const createPost = async (req, res) => {
	const post = req.body;
	console.log(req.userId);

	const newPost = new PostMessage({ ...post, creator: req.userId });

	try {
		await newPost.save();

		res.status(201).json(newPost);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

const updatePost = async (req, res) => {
	const _id = req.params.id;
	const post = req.body;

	if (mongoose.Types.ObjectId.isValid(_id)) {
		const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
		return res.status(200).json(updatedPost);
	}

	return res.status(404).json(`No post found with id: ${_id}`);
};

const deletePost = async (req, res) => {
	const _id = req.params.id;

	if (mongoose.Types.ObjectId.isValid(_id)) {
		const deletedPost = await PostMessage.findByIdAndDelete(_id);
		return res.status(200).json(deletedPost);
	}

	return res.status(404).json(`No post found with id: ${_id}`);
};

const likePost = async (req, res) => {
	const _id = req.params.id;

	if (!req.userId) return res.json({ message: "Not logged in" });

	if (mongoose.Types.ObjectId.isValid(_id)) {
		const post = await PostMessage.findById(_id);
		const index = post.likes.findIndex((id) => id == req.userId.toString());

		if (index === -1) {
			post.likes.push(req.userId);
		} else {
			post.likes = post.likes.filter((id) => id !== req.userId.toString());
		}
		const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

		return res.status(200).json(updatedPost);
	}

	return res.status(404).json(`No post found with id: ${_id}`);
};

export { getPosts, createPost, updatePost, getSpecificPost, deletePost, likePost };
