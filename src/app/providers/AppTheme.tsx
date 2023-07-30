import React, { useLayoutEffect } from "react";

import { useStoreSelector } from "@/shared/lib/hooks";

interface IAppThemeProps {
	children?: React.ReactNode;
}

const AppTheme: React.FC<IAppThemeProps> = ({ children }) => {
	const { theme } = useStoreSelector(state => state.appSettings);

	useLayoutEffect(() => {
		const classList = document.body.classList;

		// Delete all themes classes
		classList.forEach(className => {
			if (className.startsWith("theme")) {
				classList.remove(className);
			}
		});

		classList.add(`theme_${theme}`);
	}, [theme]);

	return <React.Fragment>{children}</React.Fragment>;
};

export default AppTheme;
