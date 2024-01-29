import React, { useLayoutEffect } from "react";

import { useStoreSelector } from "@/shared/lib/hooks";

interface IAppThemeProps {
	children?: React.ReactNode;
}

const AppTheme: React.FC<IAppThemeProps> = ({ children }) => {
	const theme = useStoreSelector(state => state.settings.theme);

	useLayoutEffect(() => {
		const bodyClassList = document.body.classList;

		// Delete all themes classes
		bodyClassList.forEach(className => {
			if (className.startsWith("theme")) {
				bodyClassList.remove(className);
			}
		});

		bodyClassList.add(`theme_${theme}`);
		localStorage.setItem("theme", theme);
	}, [theme]);

	return <React.Fragment>{children}</React.Fragment>;
};

export default AppTheme;
