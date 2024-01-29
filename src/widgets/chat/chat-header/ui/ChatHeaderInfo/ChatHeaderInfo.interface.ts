import { IChat } from "@/entities/chat/interfaces";
import { IUser } from "@/entities/user/interfaces";

export interface IChatHeaderInfoProps {
	chat: IChat;
	currentUserId: IUser["id"];
}
