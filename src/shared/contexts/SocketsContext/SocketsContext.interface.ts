import React from "react";
import { Socket } from "socket.io-client";

export interface ISocketsContext {
	presenceSocket: Socket | null;
	chatSocket: Socket | null;
	sockets: {
		name: "Chat" | "Presence";
		socket: Socket;
	}[];
	updateSocketsAccessToken: (accessToken: string) => void;
	disconnectAll: () => void;
}

export interface ISocketsProviderProps {
	children: React.ReactNode;
}
