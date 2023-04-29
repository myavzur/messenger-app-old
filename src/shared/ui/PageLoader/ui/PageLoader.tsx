import { Box, Loader } from "@mantine/core";
import React from "react";

const PageLoader: React.FC = () => {
	return (
		<Box
			sx={{
				position: "absolute",
				left: 0,
				top: 0,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				width: "100vw"
			}}
		>
			<Loader
				color="red"
				size="xl"
			/>
		</Box>
	);
};

export default PageLoader;
