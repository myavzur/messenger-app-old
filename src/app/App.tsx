import React, { useEffect } from "react";

import { SocketsProvider } from "@/shared/contexts/SocketsContext";

import { AppMantine, AppRouter, AppStore, AppTheme } from "@/app/providers";
import '@/app/styles/index.scss';

function App() {
	useEffect(() => {
		document.title = import.meta.env.VITE_APP_TITLE;
	}, []);

	return (
		<SocketsProvider>
			<AppMantine>
				<AppStore>
					<AppTheme>
						<AppRouter />
					</AppTheme>
				</AppStore>
			</AppMantine>
		</SocketsProvider>
	);
}

export default App;
