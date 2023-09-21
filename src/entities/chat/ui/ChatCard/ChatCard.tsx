import cn from "classnames";
import React from "react";

import { useStoreSelector } from "@/shared/lib/hooks";
import { Avatar } from "@/shared/ui";

import { getChatTitle } from "../../lib/helpers";
import { formatUpdatedDate } from "../../lib/helpers/format-updated-date";
import { getChatUserStatus } from "../../lib/helpers/get-chat-user-status";

import { IChatCardProps } from "./ChatCard.interface";

import styles from "./ChatCard.module.scss";

export const ChatCard: React.FC<IChatCardProps> = ({
	chat,
	onClick,
	isSelected
}) => {
	const title = getChatTitle(chat);
	const status = getChatUserStatus(chat);

	return (
		<div
			className={cn(styles.card, { [styles.card_selected]: isSelected })}
			onClick={() => onClick(chat.id)}
		>
			<Avatar
				className={styles.card__image}
				status={status}
				src={undefined}
				alt={undefined}
			>
				{title}
			</Avatar>

			<div className={styles.card__info}>
				<div className={styles.card__top}>
					<p className={styles["card__top-title"]}>{title}</p>
					<p className={styles["card__top-updated"]}>
						{formatUpdatedDate(chat.updated_at)}
					</p>
				</div>

				<div className={styles.card__bottom}>
					<p className={styles["card__bottom-text"]}>{chat.last_message?.text}</p>
				</div>
			</div>
		</div>
	);
};
