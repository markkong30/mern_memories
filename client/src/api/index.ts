import axios from "axios";
import { IPost } from "../../types";

const url = `${process.env.REACT_APP_BASE_URL}/posts`;

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost: IPost) => axios.post(url, newPost);
export const updatePost = (id: string, updatedPost: IPost) =>
	axios.patch(`${url}/${id}`, updatedPost);

export const fetchSpecificPost = (id: string) => axios.get(`${url}/${id}`);
