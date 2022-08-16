import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import memories from "../../images/memories.png";
import useStyles from "./styles";
import { googleLogout } from "@react-oauth/google";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { deleteUser, getUserProfile } from "../../features/userSlice";

const Navbar = () => {
	// const [user, setUser] = useState(JSON.parse(localStorage.getItem("userProfile")!));
	const user = useSelector(getUserProfile);
	const classes = useStyles();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const storageProfile = JSON.parse(localStorage.getItem("userProfile")!);

	const logout = () => {
		localStorage.removeItem("userProfile");
		dispatch(deleteUser());
		googleLogout();
	};

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<div className={classes.brandContainer}>
				<Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
					Memories
				</Typography>
				<img className={classes.image} src={memories} alt="icon" height="60" />
			</div>
			<Toolbar className={classes.toolbar}>
				{user && storageProfile ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user.name}
							src={user.picture || "https://picsum.photos/200"}
						>
							{user.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant="h6">
							{user.name}
						</Typography>
						<Button
							variant="contained"
							className={classes.logout}
							color="secondary"
							onClick={logout}
						>
							Logout
						</Button>
					</div>
				) : location.pathname !== "/auth" ? (
					<Button component={Link} to="/auth" variant="contained" color="primary">
						Sign In
					</Button>
				) : null}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
