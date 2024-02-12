import { Socket } from "socket.io-client";

import {
	IChatClientToServerEvents,
	IChatServerToClientEvents,
	IPresenceClientToServerEvents,
	IPresenceServerToClientEvents
} from "@/shared/interfaces/socket.io";

export interface ISocketsContext {
	presenceSocket: Socket<
		IPresenceServerToClientEvents,
		IPresenceClientToServerEvents
	> | null;
	chatSocket: Socket<IChatServerToClientEvents, IChatClientToServerEvents> | null;
	sockets: {
		name: "chat" | "presence";
		socket: Socket;
	}[];
	updateSocketsAccessToken: (accessToken: string) => void;
	disconnectAll: () => void;
}
