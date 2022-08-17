export interface IPost {
	creator?: string;
	name?: string;
	title: string;
	message: string;
	tags: string[];
	selectedFile: string;
	_id?: string;
	createdAt?: Date;
	likes?: string[];
}

export interface GoogleUser {
	_id: string;
	name: string;
	token: string;
	picture: string;
}

export interface UserProfile {
	_id: string;
	name: string;
	email: string;
	password: string;
	picture?: string;
}
export interface Likes {
	_key: string;
	_ref: string;
}
