import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		title: String,
		message: String,
		creator: String,
		tags: [String],
		selectedFile: String,
		likes: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true }
);

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
