import { IAttachment } from "@/entities/attachment/interfaces";
import { IChat, IMessage } from "@/entities/chat/interfaces";
import { IUser } from "@/entities/user/interfaces";

import { IPaginationBody } from "../pagination.interface";

export interface IGetChatParams {
	polymorphicId: IChat["id"] | IUser["id"];
}

export interface IGetChatHistoryParams extends IPaginationBody {
	chatId: IChat["id"];
}

export interface ICreateGroupChatParams {
	title: IChat["title"];
	participantsIds: IUser["id"][];
}

export interface ISendMessageParams {
	polymorphicId: IChat["id"] | IUser["id"];
	replyForId?: IMessage["id"];
	attachmentIds?: IAttachment["id"][];
	text: IMessage["text"];
}

export interface IPinMessageParams {
	messageId: IMessage["id"];
}

export interface IDeleteMessagesParams {
	chatId: IChat["id"];
	messageIds: IMessage["id"][];
}
