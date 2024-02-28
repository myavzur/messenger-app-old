import { IMessage } from "@/entities/chat/interfaces";

export interface IReplyProps {
	message: IMessage;
	onClick: (message: IMessage) => void;
	className?: string;
	preventUserColors?: boolean;
}
