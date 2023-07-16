import React, { useLayoutEffect } from "react";

import { useStoreSelector } from "@/shared/lib/hooks";

interface IAppThemeProps {
	children?: React.ReactNode;
}

const AppTheme: React.FC<IAppThemeProps> = ({ children }) => {
	const { theme } = useStoreSelector(state => state.appSettings);

	useLayoutEffect(() => {
		document.body.classList.add(`theme_${theme}`);
	}, [theme]);

	return <React.Fragment>{children}</React.Fragment>;
};

export default AppTheme;