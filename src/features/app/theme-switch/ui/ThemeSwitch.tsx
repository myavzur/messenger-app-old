import React from "react";

import { useTheme } from "@/shared/lib/hooks";
import { Switch } from "@/shared/ui";

export const ThemeSwitch: React.FC = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Switch
			checked={theme === "insomnia"}
			onChange={() => toggleTheme()}
		/>
	);
};
