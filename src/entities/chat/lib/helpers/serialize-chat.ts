import { IChat } from "@/shared/interfaces/chat.interface";
import { IUser } from "@/shared/interfaces/user.interface";

interface ISerializeChatParams {
	currentUserId: IUser["id"];
	chat: IChat;
}

interface ISerializeChatResult {
	serializedChat: IChat;
	userStatus?: IUser["status"];
}

export const serializeChat = ({
	currentUserId,
	chat
}: ISerializeChatParams): ISerializeChatResult => {
	if (chat.is_group) {
		return {
			serializedChat: chat
		};
	}

	const oppositeUser = chat.users.find(user => user.id !== currentUserId);
	if (!oppositeUser) {
		console.log(chat);
		console.log("for", currentUserId);
		console.error("Oops...something gone wrong");
		return {
			serializedChat: chat
		};
	}

	const serializedChat: IChat = { ...chat };
	serializedChat.title = oppositeUser.account_name;

	return { serializedChat, userStatus: oppositeUser.status };
};
