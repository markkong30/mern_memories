import React, { useState } from "react";
import { Box, Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { NetworkLockedOutlined } from "@mui/icons-material";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import useStyles from "./styles";
import Input from "./Input";
import { useAppDispatch } from "../../store/store";
import { saveUser } from "../../features/userSlice";

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

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

const Auth = () => {
	const [form, setForm] = useState(initialState);
	const [isSignup, setIsSignup] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const handleShowPassword = () => setShowPassword(!showPassword);
	const dispatch = useAppDispatch();
	const classes = useStyles();

	const loginSuccess = (res: CredentialResponse) => {
		const decoded: { name: string; picture: string; sub: string } = jwt_decode(res.credential!);
		const { name, picture, sub } = decoded;
		const userProfile = { name, picture, token: sub };
		console.log(decoded);

		dispatch(saveUser(userProfile));
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

	return (
		<Container component="main" maxWidth="xs">
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
									label="First Name"
									handleChange={handleInputChange}
									autoFocus
									half
								/>
								<Input name="lastName" label="Last Name" handleChange={handleInputChange} half />
							</>
						)}
						<Input
							name="email"
							label="Email Address"
							handleChange={handleInputChange}
							type="email"
						/>
						<Input
							name="password"
							label="Password"
							handleChange={handleInputChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name="confirmPassword"
								label="Confirm Password"
								handleChange={handleInputChange}
								type="password"
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
							<Button onClick={() => setIsSignup((prev) => !prev)}>
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
