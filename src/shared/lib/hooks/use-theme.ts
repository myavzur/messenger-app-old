import { useStoreDispatch, useStoreSelector } from ".";
import { useCallback } from "react";

import { settingsActions } from "@/shared/models/settings";

export const useTheme = () => {
	const dispatch = useStoreDispatch();
	const theme = useStoreSelector(state => state.settings.theme);

	const toggleTheme = useCallback(() => {
		const newTheme = theme === "winter" ? "insomnia" : "winter";
		dispatch(settingsActions.setTheme(newTheme));
	}, [dispatch, theme]);

	return { theme, toggleTheme };
};
