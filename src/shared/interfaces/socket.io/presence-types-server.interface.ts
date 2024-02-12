import { IChat } from "@/entities/chat/interfaces";
import { UserStatus } from "@/entities/user/interfaces";

export interface INewStatusInLocalChatData {
	chatId: IChat["id"];
	status: UserStatus;
}
