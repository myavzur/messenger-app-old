import { IChat } from "@/entities/chat/interfaces";
import { UserStatus } from "@/entities/user/interfaces";

interface INewStatusInLocalChatData {
	chatId: IChat["id"];
	status: UserStatus;
}

export interface IPresenceServerToClientEvents {
	"new-status-in-local-chat": (data: INewStatusInLocalChatData) => void;
}

interface IChangeStatusParams {
	status: UserStatus;
}

export interface IPresenceClientToServerEvents {
	"change-status": (params: IChangeStatusParams) => void;
}
