import { IUser } from "@/entities/user/interfaces";

import { IChat } from "./chat.interface";

export interface ICreateGroupChatBody {
	title: IChat["title"];
	participantsIds: IUser["id"][];
}
