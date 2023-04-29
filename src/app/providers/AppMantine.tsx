import { MantineProvider } from "@mantine/core";
import React from "react";

interface IAppMantineProps {
	children?: React.ReactNode;
}

const AppMantine: React.FC<IAppMantineProps> = ({ children }) => {
	return (
		<MantineProvider
			theme={{
				colorScheme: "dark",
				globalStyles: theme => ({
					body: {
						...theme.fn.fontStyles(),
						backgroundColor:
							theme.colorScheme === "dark"
								? theme.colors.dark[8]
								: theme.colors.gray[0]
					}
				})
			}}
			withNormalizeCSS={true}
		>
			{children}
		</MantineProvider>
	);
};

export default AppMantine;
