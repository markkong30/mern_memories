import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Container } from "@material-ui/core";
import { useAppDispatch } from "./store/store";
import { fetchPosts } from "./features/postsSlice";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { saveUser } from "./features/userSlice";

const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("userProfile")!);

		if (user && user.profile) {
			dispatch(saveUser(user.profile));
		} else if (user && user.name) {
			dispatch(saveUser(user));
		}
	}, [dispatch]);

	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID!}>
			<Container maxWidth="lg">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/auth" element={<Auth />} />
				</Routes>
			</Container>
		</GoogleOAuthProvider>
	);
};

export default App;
