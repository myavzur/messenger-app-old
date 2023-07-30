import { IMessage } from "@/shared/interfaces/message.interface";

export interface ChatMessageProps {
	message: IMessage;
	isOwn: boolean;
	className?: string;
	withAuthorName?: boolean;
	withAuthorAvatar?: boolean;
}
