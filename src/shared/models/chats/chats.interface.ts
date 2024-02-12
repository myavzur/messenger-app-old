import { PayloadAction } from "@reduxjs/toolkit";

import { IChat, IMessage } from "@/entities/chat/interfaces";
import { IUser, UserStatus } from "@/entities/user/interfaces";

export interface IChatsState {
	currentChat: {
		data: IChat | null;
		embeddedMessage: IMessage | null;
	};
	chatList: IChat[];
}

export type IUpdateChatAction = PayloadAction<{
	chatId: IChat["id"];
	newData: Partial<IChat>;
}>;

export type IAddMessageAction = PayloadAction<{
	chatId: IChat["id"];
	message: IMessage;
}>;

export type IDeleteMessagesAction = PayloadAction<{
	chatId: IChat["id"];
	messageIds: IMessage["id"][];
}>;

export type IUpdateLocalChatPresenceAction = PayloadAction<{
	chatId: IChat["id"];
	userId: IUser["id"];
	status: UserStatus;
}>;
