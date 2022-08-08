import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core/";
import { ThumbUpAlt, Delete, MoreHoriz } from "@mui/icons-material";
import moment from "moment";
import { useAppDispatch } from "../../../store/store";

// import { likePost, deletePost } from '../../../actions/posts';
import useStyles from "./styles";
import { IPost } from "../../../../types";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import EditIcon from "@mui/icons-material/Edit";
import { useRef } from "react";
import { useEffect } from "react";

interface IProps {
	post: IPost;
}

const Post: React.FC<IProps> = ({ post }) => {
	const dispatch = useAppDispatch();
	const classes = useStyles();
	const [showEdit, setShowEdit] = useState(false);
	const editMenu = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const checkOutside = (e: any) => {
			console.log("here", editMenu);

			if (!editMenu?.current?.contains(e.target)) {
				setShowEdit(false);
				document.removeEventListener("mousedown", checkOutside);
			}
		};

		document.addEventListener("mousedown", checkOutside);

		// const checkOutside = () => {
		// 	document.addEventListener("mousedown", (e: any) => {
		// 		console.log("here");
		// 		if (!editMenu?.current?.contains(e.target)) {
		// 			return setShowEdit(false);
		// 		}
		// 	});
		// };

		return () => {
			console.log("cl");
			document.removeEventListener("mousedown", checkOutside);
		};
	}, [showEdit]);

	const editDisplay = (e: React.MouseEvent<HTMLButtonElement>) => {
		setShowEdit(true);
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
					<Typography variant="h6">{post.creator}</Typography>
					<Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
				</div>

				{showEdit ? (
					<Paper className={classes.overlayMenu} sx={{ width: 120 }} ref={editMenu}>
						<MenuList>
							<MenuItem>
								<ListItemIcon>
									<EditIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText>Edit</ListItemText>
							</MenuItem>
							<MenuItem>
								<ListItemIcon>
									<Delete fontSize="small" />
								</ListItemIcon>
								<ListItemText>Delete</ListItemText>
							</MenuItem>
						</MenuList>
					</Paper>
				) : (
					<div className={classes.overlay2}>
						<Button style={{ color: "white" }} size="small" onClick={editDisplay}>
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
					<Button size="small" color="primary" onClick={() => {}}>
						<ThumbUpAlt fontSize="small" /> Like {post.likeCount}{" "}
					</Button>
					<Button size="small" color="primary" onClick={() => {}}>
						<Delete fontSize="small" /> Delete
					</Button>
				</CardActions>
			</Card>
		</>
	);
};

export default Post;
