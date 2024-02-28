import { IAttachment } from "@/entities/attachment/interfaces";
import { IUser } from "@/entities/user/interfaces";

import { IChat } from "./chat.interface";

export interface IMessage {
	id: string;
	created_at: Date;
	text?: string | null;

	reply_for?: IMessage | null;
	attachments: IAttachment[];

	user: IUser;
	chat?: IChat;
}
