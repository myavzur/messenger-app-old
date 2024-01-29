import { IChat } from "@/entities/chat/interfaces";

import { IContextMenuProps } from "../ContextMenu";

export interface IChatContextMenuProps extends Omit<IContextMenuProps, "children"> {
	chat: IChat;
}
