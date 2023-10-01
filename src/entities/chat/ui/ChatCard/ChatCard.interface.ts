import { IChat } from "@/shared/interfaces/chat.interface";
import { IUser } from "@/shared/interfaces/user.interface";

export interface IChatCardProps {
	currentUserId: IUser["id"];
	chat: IChat;
	onClick: (id: IChat["id"]) => void;
	isSelected?: boolean;
	withUpdatedTime?: boolean;
	customBottomText?: string;
}
