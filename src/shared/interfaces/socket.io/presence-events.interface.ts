import { IChangeStatusParams } from "./presence-types-client.interface";
import { INewStatusInLocalChatData } from "./presence-types-server.interface";

export interface IPresenceServerToClientEvents {
	"new-status-in-local-chat": (data: INewStatusInLocalChatData) => void;
}

export interface IPresenceClientToServerEvents {
	"change-status": (params: IChangeStatusParams) => void;
}
