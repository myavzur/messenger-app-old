import { IChat } from "./chat.interface";
import { IMessage } from "./message.interface";
import { IUser } from "./user.interface";

// * Server
export interface IChatServerToClientEvents {
	chats: (data: {
		chats: IChat[];
		totalItems: number;
		totalPages: number;
		currentPage: number;
	}) => void;
	chat: (data: IChat) => void;
	"chat-created": (data: IChat) => void;
	"chat-history": (data: {
		chat_id: IChat["id"];
		messages: IMessage[];
		totalItems: number;
		totalPages: number;
		currentPage: number;
	}) => void;
	"new-message": (data: { chat_id: IChat["id"]; message: IMessage }) => void;
}

// * Client
export interface IChatClientToServerEvents {
	"get-chats": (params: { page: number; limit: number }) => void;
	"get-chat": (params: { chatId?: IChat["id"]; userId?: IUser["id"] }) => void;
	"get-chat-history": (params: {
		chatId: IChat["id"];
		page: number;
		limit: number;
	}) => void;
	"send-message": (params: {
		chatId?: IChat["id"];
		userId?: IUser["id"];
		text: IMessage["text"];
	}) => void;
}
