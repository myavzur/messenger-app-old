import cn from "classnames";
import React from "react";

import { IReplyProps } from "./MessageEmbedded.interface";

import styles from "./MessageEmbedded.module.scss";

export const MessageEmbedded: React.FC<IReplyProps> = ({
	message,
	onClick,
	className,
	preventUserColors
}) => {
	const userTheme = message.user.theme;
	const inlineStyle =
		!preventUserColors &&
		({
			"--color-highlight": `var(--color-highlight-${userTheme}, red)`,
			"--color-highlight-bg": `var(--color-highlight-${userTheme}-bg, red)`
		} as React.CSSProperties);

	return (
		<div
			style={inlineStyle || undefined}
			className={cn(styles.reply, className)}
			onClick={() => onClick(message)}
		>
			<p className={styles.reply__author}>{message.user.account_name}</p>
			<p className={styles.reply__text}>{message.text}</p>
			{!message.text && message.attachments.length && (
				<p className={styles.reply__text}>
					__ATTACHMENT_{message.attachments[0].tag.toUpperCase()}__
				</p>
			)}
		</div>
	);
};
