import { IChat } from "./chat.interface";
import { IUser, UserStatus } from "./user.interface";

// * Server
export interface IPresenceServerToClientEvents {
	"new-status-in-local-chat": (data: {
		userId: IUser["id"];
		chatId: IChat["id"];
		status: UserStatus;
	}) => void;
}

// * Client
export interface IPresenceClientToServerEvents {
	"change-status": (params: { status: UserStatus }) => void;
}
