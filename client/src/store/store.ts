import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/postsSlice";
import userReducer from "../features/userSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
	reducer: {
		posts: postsReducer,
		user: userReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
