import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as api from "../api/index";
import { IPost } from "../../types";
import { RootState } from "../store/store";
import { stat } from "fs";

interface IState {
	posts: IPost[];
	selectedPost: IPost | null;
}

interface UpdatePost {
	post: IPost;
	id: string;
}

const initialState: IState = {
	posts: [],
	selectedPost: null,
};

export const fetchPosts = createAsyncThunk("getPosts", async () => {
	const { data } = await api.fetchPosts();

	return data;
});

export const createPost = createAsyncThunk("createPost", async (post: IPost) => {
	const { data } = await api.createPost(post);

	return data;
});

export const updatePost = createAsyncThunk("updatePost", async ({ id, post }: UpdatePost) => {
	const { data } = await api.updatePost(id, post);

	return data;
});

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setSelectedPost: (state, action) => {
			state.selectedPost = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.posts = action.payload;
		});
		builder.addCase(createPost.fulfilled, (state, action) => {
			state.posts = [...state.posts, action.payload];
		});
		builder.addCase(updatePost.fulfilled, (state, action) => {
			for (let post of state.posts) {
				if (post._id == action.payload._id) {
					post = action.payload;
				}
			}

			state.selectedPost = null;
			// state.posts = state.posts.map((post) =>
			// 	post._id == action.payload._id ? action.payload : post
			// );
		});
	},
});

export const { setSelectedPost } = postsSlice.actions;

export const getPosts = (state: RootState) => state.posts.posts;
export const getSelectedPost = (state: RootState) => state.posts.selectedPost;

export default postsSlice.reducer;
