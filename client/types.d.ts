export interface IPost {
	creator: string;
	title: string;
	message: string;
	tags: string[];
	selectedFile: string;
	_id?: string;
	createdAt?: Date;
	likeCount?: number;
}

export interface GoogleUser {
	name: string;
	token: string;
	picture: string;
}

export interface UserProfile {
	id: string;
	name: string;
	email: string;
	password: string;
	picture?: string;
}
export interface Likes {
	_key: string;
	_ref: string;
}
