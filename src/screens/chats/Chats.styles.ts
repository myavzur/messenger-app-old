import { createStyles } from "@mantine/core";

export const useStyles = createStyles(theme => ({
	layout: {
		display: "flex",
		height: "100vh"
	},
	header: {
		minHeight: 90,
		padding: `0 ${theme.spacing.sm}`,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottom: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
		}`
	}
}));
