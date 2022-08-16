import axios from "axios";
import { IPost, UserProfile } from "../../types";

const url = `${process.env.REACT_APP_BASE_URL}`;
const API = axios.create({ baseURL: url });

//posts

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost: IPost) => API.post("/posts", newPost);
export const likePost = (id: string) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id: string, updatedPost: IPost) =>
	API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id: string) => API.delete(`/posts/${id}`);

//user

export const signIn = (formData: UserProfile) => API.post("/user/signin", formData);
export const signUp = (formData: UserProfile) => API.post("/user/signup", formData);
