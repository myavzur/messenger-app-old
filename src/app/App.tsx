import React, { useEffect } from "react";

import {
	AppChatSocketHandler,
	AppPresenceSocketHandler,
	AppRouter,
	AppStore,
	AppTheme
} from "@/app/providers";
import "@/app/styles/index.scss";

import { SocketsProvider } from "@/shared/contexts/SocketsContext";

function App() {
	useEffect(() => {
		document.title = import.meta.env.VITE_APP_TITLE;
	}, []);

	return (
		<SocketsProvider>
			<AppStore>
				<AppPresenceSocketHandler>
					<AppChatSocketHandler>
						<AppTheme>
							<AppRouter />
						</AppTheme>
					</AppChatSocketHandler>
				</AppPresenceSocketHandler>
			</AppStore>
		</SocketsProvider>
	);
}

export default App;
