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
				{message.attachments?.length && (
					<div
						className={"grid grid-cols-4 mb-2 gap-2"}
						style={{ gridTemplateRows: "repeat(3, 120px)" }}
					>
						{message.attachments.map(attachment => (
							<div
								key={attachment.id}
								className="rounded-md overflow-hidden"
							>
								{(attachment.file_type.startsWith("video") && (
									<video
										key={attachment.id}
										src={"http://localhost:5123" + attachment.file_url}
										muted={false}
										controls={true}
										autoPlay={false}
									/>
								)) || (
									<img
										src={"http://localhost:5123" + attachment.file_url}
										style={{ objectFit: "cover", width: "100%", height: "100%" }}
									/>
								)}
							</div>
						))}
					</div>
				)}

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
