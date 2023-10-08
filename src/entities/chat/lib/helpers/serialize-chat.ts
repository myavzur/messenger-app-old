import { IChat } from "@/shared/interfaces/chat.interface";
import { IUser, UserStatus } from "@/shared/interfaces/user.interface";

type SerializedChat = IChat & { title: string };

interface ISerializeChatParams {
	currentUserId: IUser["id"];
	chat: IChat;
}

interface ISerializeChatResult {
	serializedChat: SerializedChat;
	userStatus?: UserStatus;
}

export const serializeChat = ({
	currentUserId,
	chat
}: ISerializeChatParams): ISerializeChatResult => {
	if (chat.is_group) {
		return {
			serializedChat: {
				...chat,
				title: chat.title || "WARNING: Group chat without title!"
			}
		};
	}

	const oppositeUser = chat.users.find(user => user.id !== currentUserId);
	if (!oppositeUser) {
		return {
			serializedChat: {
				...chat,
				title: chat.title || "WARNING: Group chat without title!"
			}
		};
	}

	return {
		serializedChat: {
			...chat,
			title: oppositeUser.account_name,
			image_url: oppositeUser.avatar_url
		},
		userStatus: oppositeUser.status
	};
};
