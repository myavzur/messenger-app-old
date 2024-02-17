import { ChatType, IChat } from "@/entities/chat/interfaces";
import { IUser } from "@/entities/user/interfaces";

interface ISerializeChatParams {
	currentUserId: IUser["id"];
	chat: IChat;
}

export const serializeChat = ({
	currentUserId,
	chat
}: ISerializeChatParams): IChat => {
	if (chat.type === ChatType.GROUP) return chat;

	const withUser = chat.participants.find(
		participant => participant.user.id !== currentUserId
	)?.user;

	if (!withUser) return chat;

	return {
		...chat,
		title: withUser.account_name,
		image_url: withUser.avatar?.file_url,
		user_last_seen_at: withUser.last_seen_at
	};
};
