import cn from "classnames";
import React from "react";

import { MessageEmbedded } from "@/entities/chat/ui";

import { Avatar, Icon } from "@/shared/ui";

import { MessageAttachments } from "../MessageAttachments";

import { IMessageProps } from "./Message.interface";

import styles from "./Message.module.scss";

export const Message: React.FC<IMessageProps> = ({
	message,
	isOwn,
	className,
	withAuthorAvatar = false,
	withAuthorName = false,
	withAppendix = true,
	onScrollToMessage,
	onContextMenu
}) => {
	const hasAttachments = message.attachments && message.attachments.length > 0;

	const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!onContextMenu) return;
		e.preventDefault();
		onContextMenu({
			message,
			mousePosition: {
				x: e.clientX,
				y: e.clientY
			}
		});
	};

	return (
		<div
			className={cn(styles.message, { [styles.message_own]: isOwn })}
			onContextMenu={handleContextMenu}
		>
			{withAuthorAvatar && (
				<Avatar
					className={styles.avatar}
					size="xs"
					src={message.user.avatar?.file_url}
					alt={message.user.account_name}
				>
					{message.user.account_name}
				</Avatar>
			)}

			<div
				data-message-id={message.id}
				className={cn(styles.content, className)}
			>
				{hasAttachments && <MessageAttachments attachments={message.attachments} />}

				{withAuthorName && (
					<h2 className={styles.content__author}>{message.user.account_name}</h2>
				)}

				{message.reply_for && (
					<MessageEmbedded
						onClick={message => onScrollToMessage?.(message)}
						className={styles.content__embedded}
						message={message.reply_for}
					/>
				)}

				<pre className={styles.content__text}>{message.text}</pre>

				{withAppendix && (
					<Icon
						className={styles.content__appendix}
						name="appendix"
						width="10"
						height="18"
					/>
				)}
			</div>
		</div>
	);
};
