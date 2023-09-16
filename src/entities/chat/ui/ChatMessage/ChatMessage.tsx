import cn from "classnames";
import React from "react";

import { IChatMessageProps } from "./ChatMessage.interface";

import styles from "./ChatMessage.module.scss";

export const ChatMessage: React.FC<IChatMessageProps> = ({
	message,
	className,
	isOwn,
	withAuthorAvatar = false,
	withAuthorName = false
}) => {
	return (
		<div
			data-message-id={message.id}
			className={cn(styles.message, className, { [styles.message_own]: isOwn })}
		>
			{withAuthorAvatar && <p>AVA</p>}
			{withAuthorName && (
				<h2 className={styles.message__author}>{message.user.account_name}</h2>
			)}
			<div className={styles.message__text}>{message.text}</div>
		</div>
	);
};
