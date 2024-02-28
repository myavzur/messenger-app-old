import cn from "classnames";
import React from "react";

import { AvatarCircle } from "@/entities/attachment/ui";
import { MessageEmbedded } from "@/entities/chat/ui";

import { Icon } from "@/shared/ui";

import { IMessage } from "../../interfaces";
import { MessageAttachments } from "../MessageAttachments";

import { IMessageProps } from "./Message.interface";

import styles from "./Message.module.scss";

export const Message: React.FC<IMessageProps> = ({
	message,
	isOwn,
	withAuthorAvatar = false,
	withAuthorName = false,
	withAppendix = true,
	onScrollToMessage,
	onContextMenu
}) => {
	const hasAttachments = message.attachments && message.attachments.length > 0;
	const hasReply = message.reply_for && message.reply_for.id;
	const hasText = message.text;

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
			style={
				{
					"--color-highlight": `var(--color-highlight-${message.user.theme})`
				} as React.CSSProperties
			}
			className={cn(styles.message, { [styles.message_own]: isOwn })}
			onContextMenu={handleContextMenu}
		>
			{withAuthorAvatar && (
				<AvatarCircle
					attachment={message.user.avatar}
					placeholderSvgText={message.user.account_name}
					className={styles.avatar}
					size="xs"
				/>
			)}

			<div
				data-message-id={message.id}
				className={styles.content}
			>
				{!hasAttachments && withAuthorName && (
					<h2 className={cn(styles.content__item, styles.author)}>
						{message.user.account_name}
					</h2>
				)}

				{hasReply && (
					<div className={cn(styles.content__item, styles.embedded)}>
						<MessageEmbedded
							preventUserColors={isOwn}
							onClick={message => onScrollToMessage?.(message)}
							message={message.reply_for as IMessage}
						/>
					</div>
				)}

				{hasAttachments && (
					<MessageAttachments
						className={cn(styles.content__item, styles.attachments)}
						attachments={message.attachments}
					/>
				)}

				{hasText && (
					<pre className={cn(styles.content__item, styles.text)}>{message.text}</pre>
				)}

				{withAppendix && (
					<Icon
						className={styles.appendix}
						name="appendix"
						width="10"
						height="18"
					/>
				)}
			</div>
		</div>
	);
};
