import React from "react";

import { useStoreDispatch, useStoreSelector } from "@/shared/lib/hooks";
import { settingsActions } from "@/shared/models/settings";
import { Switch } from "@/shared/ui";

export const ThemeSwitch: React.FC = () => {
	const dispatch = useStoreDispatch();
	const theme = useStoreSelector(state => state.settings.theme);

	const toggleTheme = () => {
		const newTheme = theme === "winter" ? "insomnia" : "winter";
		dispatch(settingsActions.setTheme(newTheme));
	};

	return (
		<Switch
			checked={theme === "insomnia"}
			onChange={() => toggleTheme()}
		/>
	);
};
