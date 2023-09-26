import React, { useEffect } from "react";

import { AppRouter, AppStore, AppTheme } from "@/app/providers";
import "@/app/styles/index.scss";

import { SocketsContextProvider } from "@/shared/contexts/SocketsContextProvider";

const APP_TITLE = import.meta.env.VITE_APP_TITLE;
const CHAT_SERVER_URL = import.meta.env.VITE_CHAT_SERVER_URL;
const PRESENCE_SERVER_URL = import.meta.env.VITE_PRESENCE_SERVER_URL;

function App() {
	useEffect(() => {
		document.title = APP_TITLE;
	}, []);

	return (
		<AppStore>
			<SocketsContextProvider
				chatServerUrl={CHAT_SERVER_URL}
				presenceServerUrl={PRESENCE_SERVER_URL}
			>
				<AppTheme>
					<AppRouter />
				</AppTheme>
			</SocketsContextProvider>
		</AppStore>
	);
}

export default App;
