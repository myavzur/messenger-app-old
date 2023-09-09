import { IMessage } from "@/shared/interfaces/message.interface";

export interface IChatMessageProps {
	message: IMessage;
	isOwn: boolean;
	className?: string;
	withAuthorName?: boolean;
	withAuthorAvatar?: boolean;
}
