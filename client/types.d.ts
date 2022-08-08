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

export interface IUser {
	_id: string;
	_type: string;
	userName: string;
	image: string;
}

export interface UserProfile {
	userProfile: IUser | null;
	allUsers: IUser[] | [];
	addUser: (user: any) => void;
	removeUser: () => void;
	fetchAllUsers: () => void;
}

export interface Likes {
	_key: string;
	_ref: string;
}
