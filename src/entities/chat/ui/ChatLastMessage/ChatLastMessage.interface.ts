import { IUser } from "@/entities/user/interfaces";

import { IChat } from "../../interfaces";

export interface IChatLastMessageProps {
	isSelected?: boolean;
	chat: IChat;
	currentUserId: IUser["id"];
}
