import { IChat } from "@/shared/interfaces/chat.interface";
import { IUser } from "@/shared/interfaces/user.interface";

export interface IChatInfoBlockProps {
	chat: IChat;
	currentUserId: IUser["id"];
}
