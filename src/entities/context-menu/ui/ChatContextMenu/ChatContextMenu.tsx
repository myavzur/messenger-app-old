import React from "react";

import { IChatContextMenuProps } from "./ChatContextMenu.interface";

export const ChatContextMenu: React.FC<IChatContextMenuProps> = ({ chat }) => {
	return <h1>{chat.title}</h1>;
};
