import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";

import { getAccessToken, getSocketOptions } from "@/shared/lib/helpers";

import { ISocketsContext, ISocketsProviderProps } from "./SocketsContext.interface";

const PRESENCE_BASE_URL = import.meta.env.VITE_PRESENCE_BASE_URL;
const CHAT_BASE_URL = import.meta.env.VITE_CHAT_BASE_URL;

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

export const SocketsProvider: React.FC<ISocketsProviderProps> = props => {
	const [accessToken, setAccessToken] = useState(getAccessToken());
	const socketRefs = useRef<ISocketsContext["sockets"]>([]);

	const presenceSocket = useMemo<ISocketsContext["presenceSocket"]>(() => {
		if (accessToken) {
			const socket = io(PRESENCE_BASE_URL, getSocketOptions(accessToken));

			socketRefs.current.push({ name: "Presence", socket });
			return socket;
		}

		console.log("Create connection Presence: No token.");
		return null;
	}, [accessToken]);

	const chatSocket = useMemo<ISocketsContext["chatSocket"]>(() => {
		if (accessToken) {
			const socket = io(CHAT_BASE_URL, getSocketOptions(accessToken));

			socketRefs.current.push({ name: "Chat", socket });
			return socket;
		}

		console.log("Create connection Chat: No token.");
		return null;
	}, [accessToken]);

	console.log("RENDER SOCKETS Provider");

	// * Sockets Connection.
	useEffect(() => {
		socketRefs.current.forEach(({ name, socket }) => {
			socket.on("connect", () => {
				console.log(
					`[SocketsContextProvider] Connected to ${name} Service via WS. 💹`
				);
			});
			socket.on("disconnect", () => {
				console.log(
					`[SocketsContextProvider] Disconnected from ${name} Service. 🔻`
				);

				// * Delete socket from socketRefs if server disconnected him (on server).
				socketRefs.current = socketRefs.current.filter(
					socket => socket.name !== name
				);
			});
		});

		return () => {
			socketRefs.current.forEach(({ socket }) => {
				socket.disconnect();
			});
		};
	}, []);

	// * Methods
	const disconnectAll = useCallback(() => {
		socketRefs.current.forEach(({ name, socket }) => {
			console.log(`Disconnecting ${name} Socket. 🔁`);

			// * Delete socket from socketRefs if socket disconnected by himself (on client).
			socketRefs.current = socketRefs.current.filter(socket => socket.name !== name);
			socket.disconnect();
		});
	}, []);

	/** Once method is called, it will create new instances of sockets with new credentials. */
	const updateSocketsAccessToken = useCallback((accessToken: string) => {
		console.log("[SocketsContextProvider] Updating access token. 🔁");
		setAccessToken(accessToken);
	}, []);

	return (
		<SocketsContext.Provider
			value={{
				presenceSocket: presenceSocket,
				chatSocket: chatSocket,
				sockets: socketRefs.current,
				updateSocketsAccessToken,
				disconnectAll
			}}
		>
			{props.children}
		</SocketsContext.Provider>
	);
};
