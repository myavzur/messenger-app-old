import { IChat } from "@/entities/chat/interfaces";
import { IUser } from "@/entities/user/interfaces";

export interface IMessageListProps {
	chat: IChat;
	currentUserId: IUser["id"];
	className?: string;
}
