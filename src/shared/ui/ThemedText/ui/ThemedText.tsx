import { Text, useMantineTheme } from "@mantine/core";
import React from "react";

import { ThemedTextProps } from "./ThemedText.interface";

const ThemedText: React.FC<ThemedTextProps> = ({ children }) => {
	const theme = useMantineTheme();

	return (
		<Text color={theme.colorScheme === "dark" ? "white" : "dark"}>{children}</Text>
	);
};

export default ThemedText;
