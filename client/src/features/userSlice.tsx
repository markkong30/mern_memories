import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as api from "../api/index";
import { GoogleUser, UserProfile } from "../../types";
import { RootState } from "../store/store";

interface IState {
	userProfile: GoogleUser | UserProfile | null;
	error: {
		state: boolean;
		message: string;
	};
}

const initialState: IState = {
	userProfile: {
		_id: "",
		name: "",
		picture: "",
		token: "",
	},
	error: {
		state: false,
		message: "",
	},
};

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
		setUserError: (state, action) => {
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signIn.fulfilled, (state, action) => {
			localStorage.setItem("userProfile", JSON.stringify(action.payload));

			state.userProfile = action.payload.profile;
			state.error = { ...state.error, state: false };
		});
		builder.addCase(signUp.fulfilled, (state, action) => {
			localStorage.setItem("userProfile", JSON.stringify(action.payload));

			state.userProfile = action.payload.profile;
			state.error = { ...state.error, state: false };
		});
		builder.addCase(signIn.rejected, (state, action) => {
			state.error = { state: true, message: "Invalid email or password!" };
		});
	},
});

export const { saveUser, deleteUser, setUserError } = userSlice.actions;

export const getUserProfile = (state: RootState) => state.user.userProfile;
export const getUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
