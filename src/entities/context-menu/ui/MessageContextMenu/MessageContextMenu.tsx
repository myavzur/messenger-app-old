import React, { useState } from "react";

import { ChatParticipantRole, ChatType } from "@/entities/chat/interfaces";
import { copyToClipboard } from "@/entities/chat/lib/helpers";

import { useAuth, useSocketsContext, useStoreDispatch } from "@/shared/lib/hooks";
import { chatActions } from "@/shared/models/chats";
import { Icon, MenuItem } from "@/shared/ui";

import { ContextMenu } from "../ContextMenu";

import { IMessageContextMenuProps } from "./MessageContextMenu.interface";

export const MessageContextMenu: React.FC<IMessageContextMenuProps> = ({
	chat,
	message,
	...contextMenuProps
}) => {
	const dispatch = useStoreDispatch();
	const { chatSocket } = useSocketsContext();
	const { currentUser } = useAuth();
	const [isCopied, setCopied] = useState(false);

	const currentUserChatRole = chat.participants.find(
		participant => participant.user.id === currentUser?.id
	)?.role;
	const isOwn = currentUser?.id === message.user.id;

	const canEdit = isOwn;
	const canDelete =
		(chat.type === ChatType.GROUP &&
			currentUserChatRole !== ChatParticipantRole.PARTICIPANT) ||
		isOwn;

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
		if (!chatSocket?.connected) return;

		alert(`Pin: ${message.text}`);
		contextMenuProps.onClose();
	};

	const handleDelete = () => {
		if (!chatSocket?.connected) return;

		chatSocket?.emit("delete-messages", {
			chatId: chat.id,
			messageIds: [message.id]
		});

		contextMenuProps.onClose();
	};

	return (
		<ContextMenu {...contextMenuProps}>
			<MenuItem
				iconElement={<Icon name="reply" />}
				label="Reply"
				onClick={handleReply}
			/>
			{canEdit && (
				<MenuItem
					iconElement={<Icon name="edit" />}
					label="Edit"
					onClick={handleEdit}
				/>
			)}
			<MenuItem
				iconElement={<Icon name={isCopied ? "check" : "copy"} />}
				label="Copy Text"
				onClick={handleCopyText}
			/>
			<MenuItem
				iconElement={<Icon name="pin" />}
				label="Pin"
				onClick={handlePin}
			/>
			{canDelete && (
				<MenuItem
					isDangerous={true}
					iconElement={<Icon name="trash-bin" />}
					label="Delete"
					onClick={handleDelete}
				/>
			)}
		</ContextMenu>
	);
};
