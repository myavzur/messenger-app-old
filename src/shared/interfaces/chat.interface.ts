import { IMessage } from "./message.interface";
import { IUser } from "./user.interface";

export const TEMPORARY_CHAT_ID = -1;

export interface IChat {
	id: number;
	updated_at: Date;
	title: string | null;
	image_url?: string;
	is_group: boolean;
	users_count: number;
	users: IUser[];
	messages: IMessage[];
	last_message?: IMessage;
}

export interface ICreateGroupChatBody extends Pick<IChat, "title"> {
	userIds: IUser["id"][];
}
