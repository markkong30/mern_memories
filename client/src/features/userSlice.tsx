import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as api from "../api/index";
import { IUser } from "../../types";
import { RootState } from "../store/store";

interface IState {
	userProfile: IUser;
}

const initialState: IState = {
	userProfile: {
		name: "",
		picture: "",
		token: "",
	},
};

export const fetchPosts = createAsyncThunk("getPosts", async () => {
	const { data } = await api.fetchPosts();

	return data;
});

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		saveUser: (state, action: PayloadAction<IUser>) => {
			state.userProfile = action.payload;
		},
	},
	extraReducers: (builder) => {},
});

export const { saveUser } = userSlice.actions;

export const getUserProfile = (state: RootState) => state.user.userProfile;

export default userSlice.reducer;
