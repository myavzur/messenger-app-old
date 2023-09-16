import { IChat } from "./chat.interface";
import { IUser } from "./user.interface";

// * Server
export interface IPresenceServerToClientEvents {
	"new-status-in-local-chat": (data: {
		userId: IUser["id"];
		chatId: IChat["id"];
		status: 0 | 1;
	}) => void;
}

// * Client
export interface IPresenceClientToServerEvents {
	"change-status": (params: { status: 0 | 1 }) => void;
}
