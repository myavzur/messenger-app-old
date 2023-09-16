import { IChat } from "@/shared/interfaces/chat.interface";
import { ITemporaryChat } from "@/shared/models/chats/chats.interface";

export interface IChatHeaderProps {
	chat: IChat | ITemporaryChat;
	className?: string;
}
