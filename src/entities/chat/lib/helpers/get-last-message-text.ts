import { ChatType, IChat } from "@/entities/chat/interfaces";
import { IUser } from "@/entities/user/interfaces";

export const getLastMessageText = (chat: IChat, currentUserId: IUser["id"]) => {
	const lastMessage = chat?.last_message;

	if (!lastMessage) return "No messages yet";
	if (chat.type == ChatType.LOCAL) return lastMessage?.text;

	const user = lastMessage.user;
	if (user.id === currentUserId) return `You: ${lastMessage.text}`;
	return `${user.account_name}: ${lastMessage.text}`;
};
