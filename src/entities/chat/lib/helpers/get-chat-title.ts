import { IChat } from "@/shared/interfaces/chat.interface";

export const getChatTitle = (chat: IChat) => {
	if (chat.title) return chat.title;
	return chat.users[0].account_name;
};
