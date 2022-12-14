import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core/";
import { ThumbUpAlt, Delete, MoreHoriz } from "@mui/icons-material";
import moment from "moment";
import { useAppDispatch } from "../../../store/store";

// import { likePost, deletePost } from '../../../actions/posts';
import useStyles from "./styles";
import { IPost } from "../../../../types";

import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import Cloud from "@mui/icons-material/Cloud";
import EditIcon from "@mui/icons-material/Edit";
import { useRef } from "react";
import { useEffect } from "react";
import EditModal from "./EditModal";
import { likePost, setIsEditing, setSelectedPost } from "../../../features/postsSlice";
import { deletePost } from "../../../features/postsSlice";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../../features/userSlice";

interface IProps {
	post: IPost;
}

const Post: React.FC<IProps> = ({ post }) => {
	const dispatch = useAppDispatch();
	const classes = useStyles();
	const user = useSelector(getUserProfile);
	const [showEdit, setShowEdit] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const editMenu = useRef<HTMLDivElement>(null);
	const alreadyLiked = post?.likes?.includes(user?._id as string);

	useEffect(() => {
		const checkOutside = (e: any) => {
			if (!editMenu?.current?.contains(e.target)) {
				setShowEdit(false);

				document.removeEventListener("mousedown", checkOutside);
			}
		};

		document.addEventListener("mousedown", checkOutside);

		return () => {
			document.removeEventListener("mousedown", checkOutside);
		};
	}, [showEdit]);

	const handleEditModal = () => {
		setShowEdit(true);
		dispatch(setSelectedPost(post));
	};

	const handleOpenModal = () => {
		setOpenModal(true);
		dispatch(setIsEditing(true));
	};

	return (
		<>
			<Card className={classes.card}>
				<CardMedia
					className={classes.media}
					image={
						post.selectedFile ||
						"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
					}
					title={post.title}
				/>
				<div className={classes.overlay}>
					<Typography variant="h6">{post.name}</Typography>
					<Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
				</div>

				{showEdit ? (
					<Paper className={classes.overlayMenu} sx={{ width: 120 }} ref={editMenu}>
						<MenuList>
							<MenuItem onClick={handleOpenModal}>
								<ListItemIcon>
									<EditIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText>Edit</ListItemText>
							</MenuItem>
							<MenuItem onClick={() => dispatch(deletePost(post._id!))}>
								<ListItemIcon>
									<Delete fontSize="small" />
								</ListItemIcon>
								<ListItemText>Delete</ListItemText>
							</MenuItem>
						</MenuList>
					</Paper>
				) : (
					<div className={classes.overlay2}>
						<Button style={{ color: "white" }} size="small" onClick={handleEditModal}>
							<MoreHoriz />
						</Button>
					</div>
				)}

				<div className={classes.details}>
					<Typography variant="body2" color="textSecondary" component="h2">
						{post.tags.map((tag: string) => `#${tag} `)}
					</Typography>
				</div>
				<Typography className={classes.title} gutterBottom variant="h5" component="h2">
					{post.title}
				</Typography>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{post.message}
					</Typography>
				</CardContent>
				<CardActions className={classes.cardActions}>
					<Button
						size="small"
						color={alreadyLiked ? "secondary" : "primary"}
						onClick={() => dispatch(likePost(post._id!))}
					>
						<ThumbUpAlt fontSize="small" />
						&nbsp; Like {post.likes?.length}
					</Button>
					{/* <Button size="small" color="primary" onClick={() => {}}>
						<Delete fontSize="small" /> Delete
					</Button> */}
				</CardActions>
			</Card>
			<EditModal openModal={openModal} setOpenModal={setOpenModal} />
		</>
	);
};

export default Post;
