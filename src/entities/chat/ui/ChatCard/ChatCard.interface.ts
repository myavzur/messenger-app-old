import { IChat } from "@/entities/chat/interfaces";
import { IUser } from "@/entities/user/interfaces";

export interface IChatCardProps {
	currentUserId: IUser["id"];
	chat: IChat;
	onClick?: (chat: IChat) => void;
	isSelected?: boolean;
}
