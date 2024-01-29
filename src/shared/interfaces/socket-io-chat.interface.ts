import { IChat, IMessage } from "@/entities/chat/interfaces";
import { IUser } from "@/entities/user/interfaces";

import { IPaginatedData, IPaginationBody } from "./pagination.interface";

interface IPaginatedChatsData extends IPaginatedData {
	chats: IChat[];
}

interface IPaginatedMessagesData extends IPaginatedData {
	messages: IMessage[];
}

interface INewMessageData {
	chat_id: IChat["id"];
	message: IMessage;
}

export interface IChatServerToClientEvents {
	chats: (data: IPaginatedChatsData) => void;
	chat: (data: IChat) => void;
	"chat-created": (data: IChat) => void;
	"chat-history": (data: IPaginatedMessagesData) => void;
	"new-message": (data: INewMessageData) => void;
}

interface IGetChatParams {
	polymorphicId: IChat["id"] | IUser["id"];
}

interface IGetChatHistoryParams extends IPaginationBody {
	chatId: IChat["id"];
}

export interface ISendMessageParams {
	chatId?: IChat["id"];
	userId?: IUser["id"];
	replyForId?: IMessage["id"];
	text: IMessage["text"];
}

export interface IChatClientToServerEvents {
	"get-chats": (params: IPaginationBody) => void;
	"get-chat": (params: IGetChatParams) => void;
	"get-chat-history": (params: IGetChatHistoryParams) => void;
	"send-message": (params: ISendMessageParams) => void;
}
