import { IChat, IMessage } from "@/entities/chat/interfaces";

import { IPaginationBody } from "../pagination.interface";

import {
	ICreateGroupChatParams,
	IDeleteMessagesParams,
	IGetChatHistoryParams,
	IGetChatParams,
	IPinMessageParams,
	ISendMessageAcknowledgementData,
	ISendMessageParams
} from "./chat-types-client.interface";
import {
	INewMessageData,
	IPaginatedChatsData,
	IPaginatedMessagesData
} from "./chat-types-server.interface";

export interface IChatServerToClientEvents {
	"new-chat": (data: IChat) => void;
	"new-message": (data: INewMessageData) => void;
	"gone-messages": (data: {
		chatId: IChat["id"];
		messageIds: IMessage["id"][];
	}) => void;
	"pinned-message": (data: { message: IMessage }) => void;
}

export interface IChatClientToServerEvents {
	"get-chats": (
		params: IPaginationBody,
		callback: (data: IPaginatedChatsData) => void
	) => void;
	"get-chat": (params: IGetChatParams, callback: (data: IChat) => void) => void;
	"get-chat-history": (
		params: IGetChatHistoryParams,
		callback: (data: IPaginatedMessagesData & { chat_id: IChat["id"] }) => void
	) => void;
	"create-group-chat": (
		params: ICreateGroupChatParams,
		callback: (data: IChat) => void
	) => void;
	"send-message": (
		params: ISendMessageParams,
		callback: (data: ISendMessageAcknowledgementData) => void
	) => void;
	"change-message": () => void;
	"pin-message": (params: IPinMessageParams) => void;
	"delete-messages": (params: IDeleteMessagesParams) => void;
}
