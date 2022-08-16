import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

interface IProps {
	errorMsg: string;
}

const Error: React.FC<IProps> = ({ errorMsg }) => {
	return (
		<Alert variant="outlined" severity="error">
			{errorMsg}
		</Alert>
	);
};

export default Error;
