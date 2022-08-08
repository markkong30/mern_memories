import axios from "axios";
import { IPost } from "../../types";

const url = `${process.env.REACT_APP_BASE_URL}/posts`;

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost: IPost) => axios.post(url, newPost);