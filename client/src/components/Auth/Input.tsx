import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";

import { Visibility, VisibilityOff } from "@mui/icons-material";

interface IProps {
	name: string;
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
	half?: boolean;
	autoFocus?: boolean;
	type?: string;
	handleShowPassword?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Input: React.FC<IProps> = ({
	name,
	handleChange,
	label,
	half,
	autoFocus,
	type,
	handleShowPassword,
}) => (
	<Grid item xs={12} sm={half ? 6 : 12}>
		<TextField
			name={name}
			onChange={handleChange}
			variant="outlined"
			required
			fullWidth
			label={label}
			autoFocus={autoFocus}
			type={type}
			InputProps={
				name === "password"
					? {
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={handleShowPassword}>
										{type === "password" ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
					  }
					: undefined
			}
		/>
	</Grid>
);

export default Input;
