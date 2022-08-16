import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as api from "../api/index";
import { GoogleUser, UserProfile } from "../../types";
import { RootState } from "../store/store";

interface IState {
	userProfile: GoogleUser | UserProfile | null;
}

const initialState: IState = {
	userProfile: {
		name: "",
		picture: "",
		token: "",
	},
};

export const createUser = createAsyncThunk("createUser", async () => {
	const { data } = await api.fetchPosts();

	return data;
});

export const signIn = createAsyncThunk("signIn", async ({ formData, navigate }: any) => {
	const { data } = await api.signIn(formData);
	navigate("/");

	return data;
});

export const signUp = createAsyncThunk("signUp", async ({ formData, navigate }: any) => {
	const { data } = await api.signUp(formData);
	navigate("/");

	return data;
});

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		saveUser: (state, action) => {
			state.userProfile = action.payload;
		},
		deleteUser: (state) => {
			state.userProfile = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signIn.fulfilled, (state, action) => {
			localStorage.setItem("userProfile", JSON.stringify(action.payload.userProfile));

			state.userProfile = action.payload.userProfile;
		});
		builder.addCase(signUp.fulfilled, (state, action) => {
			localStorage.setItem("userProfile", JSON.stringify(action.payload.userProfile));

			state.userProfile = action.payload.userProfile;
		});
	},
});

export const { saveUser, deleteUser } = userSlice.actions;

export const getUserProfile = (state: RootState) => state.user.userProfile;

export default userSlice.reducer;
