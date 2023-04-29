import React, { useEffect } from "react";

import { SocketsProvider } from "@/shared/contexts/SocketsContext";

import { AppMantine, AppRouter, AppStore } from "./providers";

function App() {
	useEffect(() => {
		document.title = import.meta.env.VITE_APP_TITLE;
	}, []);

	return (
		<SocketsProvider>
			<AppMantine>
				<AppStore>
					<AppRouter />
				</AppStore>
			</AppMantine>
		</SocketsProvider>
	);
}

export default App;
