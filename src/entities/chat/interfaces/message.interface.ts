import { IUser } from "@/entities/user/interfaces";

import { IChat } from "./chat.interface";
import { IMessageAttachment } from "./message-attachment.interface";

export interface IMessage {
	id: string;
	created_at: Date;
	text: string;

	reply_for?: IMessage | null;
	attachments: IMessageAttachment[];

	user: IUser;
	chat?: IChat;
}
