import { PayloadAction } from "@reduxjs/toolkit";

import { IChat } from "@/shared/interfaces/chat.interface";
import { IMessage } from "@/shared/interfaces/message.interface";
import { IUser } from "@/shared/interfaces/user.interface";

export interface IChatsState {
	/** У чата в состоянии может быть моковый id и updated_at, поскольку на клиенте при выборе пользователя
	 * из результата поиска, нам нужно устанавливаем для activeChat
	 * временную конфигурацию чата без указа его реального id и updated_at, чтобы открыть чат
	 * только у данного пользователя, без создания его на сервере.
	 *
	 * Для отправки сообщения в таком чате на сервер - нужно использовать ID юзера
	 * с которым открыта переписка.
	 * */
	activeChat: IChat | null;
	chats: IChat[];
}

export type IUpdateChatAction = PayloadAction<{
	chatId: IChat["id"];
	updatedData: Partial<IChat>;
}>;

export type IAddMessageAction = PayloadAction<{
	chatId: IChat["id"];
	message: IMessage;
}>;

export type IUpdateLocalChatPresenceAction = PayloadAction<{
	chatId: IChat["id"];
	userId: IUser["id"];
	status: 0 | 1;
}>;
