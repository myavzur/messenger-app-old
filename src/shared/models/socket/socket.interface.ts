import { Socket } from "socket.io-client";

export interface ISocketState {
	chatSocket: Socket | null;
	userSocket: Socket | null;
}
