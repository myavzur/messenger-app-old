import React from "react";
import { Socket } from "socket.io-client";

import {
	ChatClientToServerEvents,
	ChatServerToClientEvents
} from "@/shared/interfaces/socket-io-chat.interface";

export interface ISocketsContext {
	presenceSocket: Socket | null;
	chatSocket: Socket<ChatServerToClientEvents, ChatClientToServerEvents> | null;
	sockets: {
		name: "chat" | "presence";
		socket: Socket;
	}[];
	updateSocketsAccessToken: (accessToken: string) => void;
	disconnectAll: () => void;
}

export interface ISocketsProviderProps {
	children: React.ReactNode;
}
