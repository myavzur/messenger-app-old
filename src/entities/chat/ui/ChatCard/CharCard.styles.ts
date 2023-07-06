import { createStyles } from "@mantine/core";

export const useStyles = createStyles(theme => ({
	["chat-card"]: {
		cursor: "pointer",
		"&:hover, &_selected": {
			background: theme.colors.red[7],
			color: theme.colors.gray[0]
		}
	}
}));
