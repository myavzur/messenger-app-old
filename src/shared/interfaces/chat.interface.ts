import { IBase } from "./base.interface";
import { IMessage } from "./message.interface";
import { IUser } from "./user.interface";

export interface IChat extends IBase {
	updated_at: Date;
	users: IUser[];
	messages: IMessage[];
	last_message: IMessage;
}
