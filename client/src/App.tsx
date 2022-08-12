import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Container } from "@material-ui/core";
import { useAppDispatch } from "./store/store";
import { fetchPosts } from "./features/postsSlice";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
	return (
		<Container maxWidth="lg">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth" element={<Auth />} />
			</Routes>
		</Container>
	);
};

export default App;
