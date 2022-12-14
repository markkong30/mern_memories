import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getPosts } from "../../features/postsSlice";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = () => {
	const posts = useSelector(getPosts);
	const classes = useStyles();

	return !posts.length ? (
		<CircularProgress />
	) : (
		<Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
			{posts.map((post) => (
				<Grid key={post._id} item xs={12} sm={6} md={6}>
					<Post post={post} />
				</Grid>
			))}
		</Grid>
	);
};

export default Posts;
