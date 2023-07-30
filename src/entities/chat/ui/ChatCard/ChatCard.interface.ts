import { IChat } from "@/shared/interfaces/chat.interface";

export interface ChatCardProps {
	chat: IChat;
	onClick: (id: IChat["id"]) => void;
}
