import { IChat, IMessage } from "@/entities/chat/interfaces";

import { IPaginatedData } from "../pagination.interface";

export interface IPaginatedChatsData extends IPaginatedData {
	chats: IChat[];
}

export interface IPaginatedMessagesData extends IPaginatedData {
	messages: IMessage[];
}

export interface INewMessageData {
	chat_id: IChat["id"];
	message: IMessage;
}
