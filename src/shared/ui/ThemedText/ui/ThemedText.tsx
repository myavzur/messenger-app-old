import { Text, useMantineTheme } from "@mantine/core";
import React from "react";

import { ThemedTextProps } from "./ThemedText.interface";

const ThemedText: React.FC<ThemedTextProps> = ({ children, ...textProps }) => {
	const theme = useMantineTheme();

	return (
		<Text
			{...textProps}
			color={theme.colorScheme === "dark" ? "white" : "dark"}
		>
			{children}
		</Text>
	);
};

export default ThemedText;
