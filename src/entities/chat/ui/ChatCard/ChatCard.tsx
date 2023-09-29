import cn from "classnames";
import React from "react";

import { Avatar } from "@/shared/ui";

import { formatUpdatedDate, serializeChat } from "../../lib/helpers";

import { IChatCardProps } from "./ChatCard.interface";

import styles from "./ChatCard.module.scss";

export const ChatCard: React.FC<IChatCardProps> = ({
	currentUserId,
	chat,
	onClick,
	isSelected
}) => {
	const { serializedChat, userStatus } = serializeChat({
		currentUserId,
		chat
	});

	return (
		<div
			className={cn(styles.card, { [styles.card_selected]: isSelected })}
			onClick={() => onClick(chat.id)}
		>
			<Avatar
				className={styles.card__image}
				status={userStatus}
				src={undefined}
				alt={undefined}
			>
				{serializedChat.title!}
			</Avatar>

			<div className={styles.card__info}>
				<div className={styles.card__top}>
					<p className={styles["card__top-title"]}>{serializedChat.title}</p>
					<p className={styles["card__top-updated"]}>
						{formatUpdatedDate(serializedChat.updated_at)}
					</p>
				</div>

				<div className={styles.card__bottom}>
					<p className={styles["card__bottom-text"]}>
						{serializedChat.last_message?.text}
					</p>
				</div>
			</div>
		</div>
	);
};
