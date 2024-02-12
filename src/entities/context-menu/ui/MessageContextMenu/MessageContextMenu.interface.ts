import { IChat, IMessage } from "@/entities/chat/interfaces";

import { IContextMenuProps } from "../ContextMenu";

export interface IMessageContextMenuProps
	extends Omit<IContextMenuProps, "children"> {
	chat: IChat;
	message: IMessage;
}
