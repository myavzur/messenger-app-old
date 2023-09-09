import { IChat } from "@/shared/interfaces/chat.interface";

export interface IChatCardProps {
	chat: IChat;
	onClick: (id: IChat["id"]) => void;
}
