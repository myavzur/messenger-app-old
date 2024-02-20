import { IMessage } from "../../interfaces";

export interface IMessageProps {
	message: IMessage;
	isOwn: boolean;
	className?: string;

	withAuthorName?: boolean;
	withAuthorAvatar?: boolean;
	withAppendix?: boolean;

	onScrollToMessage?: (message: IMessage) => void;
	onContextMenu?: (data: {
		message: IMessage;
		mousePosition: {
			x: number;
			y: number;
		};
	}) => void;
}
