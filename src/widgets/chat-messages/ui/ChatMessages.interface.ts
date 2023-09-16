import { IMessage } from "@/shared/interfaces/message.interface";
import { IUser } from "@/shared/interfaces/user.interface";

export interface IChatMessagesProps {
	messages: IMessage[];
	userId?: IUser["id"];
	className?: string;
}
