import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import useStyles from "./styles";
import { useAppDispatch } from "../../store/store";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { fetchPosts } from "../../features/postsSlice";

const Home: React.FC = () => {
	const classes = useStyles();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	return (
		<Grow in>
			<Container>
				<Grid
					className={classes.mainContainer}
					container
					justifyContent="space-between"
					alignItems="stretch"
					spacing={3}
				>
					<Grid item xs={12} md={7}>
						<Posts />
					</Grid>
					<Grid item xs={12} md={4}>
						<Form />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
