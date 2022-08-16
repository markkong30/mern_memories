import React, { useState } from "react";
import { Box, Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { NetworkLockedOutlined } from "@mui/icons-material";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import useStyles from "./styles";
import Input from "./Input";
import { useAppDispatch } from "../../store/store";
import { getUserError, saveUser, setUserError, signIn, signUp } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
import { useSelector } from "react-redux";

const randomImg = `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/300`;

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
	picture: randomImg,
};

interface CredentialResponse {
	/** This field is the returned ID token */
	credential?: string;
	/** This field sets how the credential is selected */
	select_by?:
		| "auto"
		| "user"
		| "user_1tap"
		| "user_2tap"
		| "btn"
		| "btn_confirm"
		| "brn_add_session"
		| "btn_confirm_add_session";
	clientId?: string;
}

const Auth: React.FC = () => {
	const [formData, setFormData] = useState(initialState);
	const [isSignup, setIsSignup] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const { state: error, message: errorMsg } = useSelector(getUserError);
	const handleShowPassword = () => setShowPassword(!showPassword);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const classes = useStyles();

	const switchUI = () => {
		setFormData(initialState);
		dispatch(setUserError({ state: false, message: "" }));
		setIsSignup((prev) => !prev);
	};
	console.log(formData);

	const loginSuccess = (res: CredentialResponse) => {
		const decoded: { name: string; picture: string; sub: string } = jwt_decode(res.credential!);
		const { name, picture, sub } = decoded;
		const userProfile = { name, picture, token: sub };
		console.log(decoded);

		localStorage.setItem("userProfile", JSON.stringify(userProfile));
		dispatch(saveUser(userProfile));
		navigate("/");
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { password, confirmPassword } = formData;

		if (isSignup) {
			if (password !== confirmPassword) {
				const error = {
					state: true,
					message: "Please check your passwords are the same!",
				};

				return dispatch(setUserError(error));
			}
			if (Object.values(formData).includes("")) {
				const error = {
					state: true,
					message: "Please filling in the missing fields!",
				};

				return dispatch(setUserError(error));
			}
		}

		if (isSignup) {
			dispatch(signUp({ formData, navigate }));
		} else {
			dispatch(signIn({ formData, navigate }));
		}
		// navigate("/");
	};

	return (
		<Container component="main" maxWidth="xs">
			{error && <Error errorMsg={errorMsg} />}
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<NetworkLockedOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					{isSignup ? "Sign up" : "Sign in"}
				</Typography>
				<form className={classes.form} onSubmit={handleFormSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									name="firstName"
									value={formData.firstName}
									label="First Name"
									handleChange={handleInputChange}
									autoFocus
									half
								/>
								<Input
									name="lastName"
									label="Last Name"
									value={formData.lastName}
									handleChange={handleInputChange}
									half
								/>
							</>
						)}
						<Input
							name="email"
							label="Email Address"
							value={formData.email}
							handleChange={handleInputChange}
							type="email"
						/>
						<Input
							name="password"
							label="Password"
							value={formData.password}
							handleChange={handleInputChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name="confirmPassword"
								label="Confirm Password"
								value={formData.confirmPassword}
								handleChange={handleInputChange}
								type="password"
								error={formData.confirmPassword == formData.password ? false : true}
							/>
						)}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{isSignup ? "Sign Up" : "Sign In"}
					</Button>
					<Box sx={{ marginBottom: "1rem" }}>
						<GoogleLogin
							onSuccess={loginSuccess}
							onError={() => {
								console.log("Login Failed");
							}}
						/>
					</Box>

					<Grid container justifyContent="flex-end">
						<Grid item>
							<Button onClick={switchUI}>
								{isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
