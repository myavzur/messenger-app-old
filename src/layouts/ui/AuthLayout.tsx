import { createStyles } from "@mantine/core";
import React from "react";

import { IDefaultLayoutProps } from "../interfaces/DefaultLayout.interface";

const useStyles = createStyles(theme => ({
	layout: {
		display: "flex",
		width: "100vw",
		height: "100vh"
	},
	layout__content: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flex: "1"
	},
	layout__view: {
		flex: "1.5",
		clipPath: "polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)",
		pointerEvents: "none",
		[theme.fn.smallerThan("lg")]: {
			display: "none"
		},
		"& img": {
			objectFit: "cover",
			width: "100%",
			height: "100%",
			display: "block"
		}
	}
}));

const AuthLayout: React.FC<IDefaultLayoutProps> = ({ children }) => {
	const { classes } = useStyles();

	return (
		<div className={classes.layout}>
			<main className={classes.layout__content}> {children} </main>
			<aside className={classes.layout__view}>
				<img
					alt="firechat-random-photo"
					src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/9afe0493484903.5e66500f8dea4.gif"
				/>
			</aside>
		</div>
	);
};

export default AuthLayout;
