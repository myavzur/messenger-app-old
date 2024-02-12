import cn from "classnames";
import React from "react";

import { ChatType } from "../../interfaces";

import { IChatLastMessageProps } from "./ChatLastMessage.interface";

import styles from "./ChatLastMessage.module.scss";

export const ChatLastMessage: React.FC<IChatLastMessageProps> = ({
	isSelected,
	chat,
	currentUserId
}) => {
	let lastMessageTextBlock: React.ReactNode | null = null;

	const lastMessage = chat.last_message;

	if (!lastMessage) {
		lastMessageTextBlock = (
			<span className={styles.last__text}>No messages yet...</span>
		);
	} else if (chat.type === ChatType.LOCAL) {
		lastMessageTextBlock = (
			<span className={styles.last__text}>{lastMessage.text}</span>
		);
	} else {
		const lastMessageUser = lastMessage.user;

		const authorName =
			lastMessageUser.id === currentUserId ? "You" : lastMessageUser.account_name;

		lastMessageTextBlock = (
			<>
				<span className={styles.last__author}>{authorName}</span>
				<span className={styles.last__colon}>:</span>
				<span className={styles.last__text}>{lastMessage.text}</span>
			</>
		);
	}

	return (
		<p className={cn(styles.last, { [styles.last_selected]: isSelected })}>
			{lastMessageTextBlock}
		</p>
	);
};
