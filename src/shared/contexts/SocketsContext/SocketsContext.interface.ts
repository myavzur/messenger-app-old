import React from "react";
import { Socket } from "socket.io-client";

import {
	IChatClientToServerEvents,
	IChatServerToClientEvents
} from "@/shared/interfaces/socket-io-chat.interface";

export interface ISocketsContext {
	presenceSocket: Socket | null;
	chatSocket: Socket<IChatServerToClientEvents, IChatClientToServerEvents> | null;
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
