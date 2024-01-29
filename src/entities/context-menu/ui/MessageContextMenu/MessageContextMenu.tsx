import React, { useState } from "react";

import { copyToClipboard } from "@/entities/chat/lib/helpers";

import { useStoreDispatch } from "@/shared/lib/hooks";
import { chatActions } from "@/shared/models/chats";
import { Icon, MenuItem } from "@/shared/ui";

import { ContextMenu } from "../ContextMenu";

import { IMessageContextMenuProps } from "./MessageContextMenu.interface";

export const MessageContextMenu: React.FC<IMessageContextMenuProps> = ({
	message,
	...contextMenuProps
}) => {
	const dispatch = useStoreDispatch();
	const [isCopied, setCopied] = useState(false);

	const handleReply = () => {
		dispatch(chatActions.setCurrentChatEmbeddedMessage(message));
		contextMenuProps.onClose();
	};

	const handleEdit = () => {
		alert(`Edit: ${message.text}`);
		contextMenuProps.onClose();
	};

	const handleCopyText = () => {
		copyToClipboard({
			value: message.text,
			onCopy: () => setCopied(true),
			onCopyTimeout: () => setCopied(false)
		});
	};

	const handlePin = () => {
		alert(`Pin: ${message.text}`);
		contextMenuProps.onClose();
	};

	const handleDelete = () => {
		alert(`Delete: ${message.text}`);
		contextMenuProps.onClose();
	};

	return (
		<ContextMenu {...contextMenuProps}>
			<MenuItem
				iconElement={<Icon name="reply" />}
				label="Reply"
				onClick={handleReply}
			/>
			<MenuItem
				iconElement={<Icon name="edit" />}
				label="Edit"
				onClick={handleEdit}
			/>
			<MenuItem
				iconElement={<Icon name={isCopied ? "check" : "copy"} />}
				label={isCopied ? "Saved To Clipboard" : "Copy Text"}
				onClick={handleCopyText}
			/>
			<MenuItem
				iconElement={<Icon name="pin" />}
				label="Pin"
				onClick={handlePin}
			/>
			<MenuItem
				isDangerous={true}
				iconElement={<Icon name="trash-bin" />}
				label="Delete"
				onClick={handleDelete}
			/>
		</ContextMenu>
	);
};
