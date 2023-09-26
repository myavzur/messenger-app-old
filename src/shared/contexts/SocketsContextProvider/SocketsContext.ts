import React from "react";

import { ISocketsContext } from "./SocketsContext.interface";

export const SocketsContext = React.createContext<ISocketsContext>({
	presenceSocket: null,
	chatSocket: null,
	sockets: [],
	updateSocketsAccessToken: () => {
		return;
	},
	disconnectAll: () => {
		return;
	}
});
