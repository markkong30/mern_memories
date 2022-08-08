import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as api from "../api/index";
import { IPost } from "../../types";
import { RootState } from "../store/store";

interface IState {
	posts: IPost[];
}

const initialState: IState = {
	posts: [],
};

export const fetchPosts = createAsyncThunk("getPosts", async () => {
	const { data } = await api.fetchPosts();

	return data;
});

export const createPost = createAsyncThunk("createPost", async (post: IPost) => {
	const { data } = await api.createPost(post);

	return data;
});

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.posts = action.payload;
		});
		builder.addCase(createPost.fulfilled, (state, action) => {
			state.posts = [...state.posts, action.payload];
		});
	},
});

export const getPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
