import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { useStoreSelector } from "@/shared/lib/hooks";
import { setTheme } from "@/shared/models/app-settings";

export const useTheme = () => {
	const dispatch = useDispatch();
	const theme = useStoreSelector(state => state.appSettings.theme);

	const toggleTheme = () => {
		const newTheme = theme === "winter" ? "insomnia" : "winter";
		dispatch(setTheme(newTheme));
	};

	return { theme, toggleTheme };
};
