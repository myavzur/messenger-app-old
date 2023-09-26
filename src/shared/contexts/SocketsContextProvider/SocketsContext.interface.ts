import { Socket } from "socket.io-client";

import {
	IChatClientToServerEvents,
	IChatServerToClientEvents
} from "@/shared/interfaces/socket-io-chat.interface";
import {
	IPresenceClientToServerEvents,
	IPresenceServerToClientEvents
} from "@/shared/interfaces/socket-io-presence.interface";

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
