import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getIsEditing, getSelectedPost, updatePost } from "../../features/postsSlice";
import { IPost } from "../../../types";
import useStyles from "./styles";
import { useAppDispatch } from "../../store/store";
import { getUserProfile } from "../../features/userSlice";

// const FileBase = require("react-file-base64");

interface IProps {
	openModal?: boolean;
	setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: React.FC<IProps> = ({ openModal, setOpenModal }) => {
	const classes = useStyles();
	const dispatch = useAppDispatch();
	const selectedPost = useSelector(getSelectedPost);
	const user = useSelector(getUserProfile);
	const isEditing = useSelector(getIsEditing);
	const [postData, setPostData] = useState<IPost>({
		title: "",
		message: "",
		tags: [],
		selectedFile: "",
	});

	useEffect(() => {
		if (selectedPost && isEditing) {
			setPostData(selectedPost);
		} else {
			clear();
		}
	}, [selectedPost, isEditing]);

	const clear = () => {
		setPostData({ title: "", message: "", tags: [], selectedFile: "" });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (openModal && selectedPost) {
			dispatch(updatePost({ id: selectedPost._id!, post: { ...postData, name: user?.name } }));
			setOpenModal!(false);
		} else {
			dispatch(createPost({ ...postData, name: user?.name }));
		}
		clear();
	};

	const setImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files!;
		getBase64(files[0]);
	};

	const getBase64 = (file: any) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const imageString = reader.result as string;
			setPostData({ ...postData, selectedFile: imageString });
		};
	};

	if (!user?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant="h6" align="center">
					Please Sign In to create your own memories and like other's memories.
				</Typography>
			</Paper>
		);
	}

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete="off"
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				{/* <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography> */}

				<TextField
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				/>
				<TextField
					name="message"
					variant="outlined"
					label="Message"
					fullWidth
					multiline
					minRows={4}
					value={postData.message}
					onChange={(e) => setPostData({ ...postData, message: e.target.value })}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags (coma separated)"
					fullWidth
					value={postData.tags}
					onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
				/>
				<div className={classes.fileInput}>
					<input type="file" onChange={setImage} />
					{/* <FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }: any) => setPostData({ ...postData, selectedFile: base64 })}
					/> */}
				</div>
				<Button
					className={classes.buttonSubmit}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
				>
					Submit
				</Button>
				<Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
