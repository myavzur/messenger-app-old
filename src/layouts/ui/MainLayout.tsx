import { Box, Flex } from "@mantine/core";
import React from "react";

import { useStyles } from "./MainLayout.styles";
import { IMainLayoutProps } from "./MainLayoutProps.interface";

const MainLayout: React.FC<IMainLayoutProps> = ({ asideContent, mainContent }) => {
	const { classes } = useStyles();

	return (
		<div className={classes.layout}>
			<Flex
				direction="column"
				w={"23%"}
				h="100vh"
			>
				{asideContent}
			</Flex>

			<Box
				sx={theme => ({
					borderLeft: `1px solid ${
						theme.colorScheme === "dark"
							? theme.colors.dark[6]
							: theme.colors.gray[4]
					}`,
					flexGrow: 1
				})}
			>
				{mainContent}
			</Box>
		</div>
	);
};

export default MainLayout;
