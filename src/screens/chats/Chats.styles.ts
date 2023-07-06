import { createStyles } from "@mantine/core";

export const useStyles = createStyles(theme => ({
	header: {
		minHeight: 40,
		padding: `${theme.spacing.xs} ${theme.spacing.md}`,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottom: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
		}`
	}
}));
