import { IChat } from "@/shared/interfaces/chat.interface";

export const getChatUserStatus = (chat: IChat) => {
	if (chat.is_group) return null;
	return chat.users[0].status;
};
