import cn from "classnames";
import React from "react";

import { ChatMessageEmbedded } from "@/entities/chat/ui";

import { Avatar, Icon } from "@/shared/ui";

import { IChatMessageProps } from "./ChatMessage.interface";

import styles from "./ChatMessage.module.scss";

export const ChatMessage: React.FC<IChatMessageProps> = ({
	message,
	isOwn,
	className,
	withAuthorAvatar = false,
	withAuthorName = false,
	withAppendix = true,
	onScrollToMessage,
	onContextMenu
}) => {
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
					src={message.user.avatar_url}
					alt={message.user.account_name}
				>
					{message.user.account_name}
				</Avatar>
			)}

			<div
				data-message-id={message.id}
				className={cn(styles.content, className)}
			>
				{withAuthorName && (
					<h2 className={styles.content__author}>{message.user.account_name}</h2>
				)}

				{message.reply_for && (
					<ChatMessageEmbedded
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
