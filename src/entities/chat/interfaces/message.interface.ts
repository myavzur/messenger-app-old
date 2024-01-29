import { IUser } from "@/entities/user/interfaces";

import { IChat } from "./chat.interface";

export interface IMessage {
	id: string;
	created_at: Date;
	text: string;

	reply_for?: IMessage;
	user: IUser;
	chat?: IChat;
}
