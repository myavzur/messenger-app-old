import { IChat } from "./chat.interface";
import { IUser } from "./user.interface";

export interface IMessage {
	created_at: Date;
	text: string;
	user: IUser;
	chat: IChat;
}
