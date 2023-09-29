import { IMessage } from "./message.interface";
import { IUser } from "./user.interface";

export interface IChat {
	id: number;
	updated_at: Date;
	title: string | null;
	is_group: boolean;
	users: IUser[];
	messages: IMessage[];
	last_message?: IMessage;
}

export const TEMPORARY_CHAT_ID = -1;
