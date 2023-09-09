import cn from "classnames";
import React from "react";

import { getLastUpdatedTime } from "@/shared/lib/helpers";
import { useStoreSelector } from "@/shared/lib/hooks";
import { Avatar } from "@/shared/ui";

import { getChatTitle } from "../../lib/helpers";

import { IChatCardProps } from "./ChatCard.interface";

import styles from "./ChatCard.module.scss";

const ChatCard: React.FC<IChatCardProps> = ({ chat, onClick }) => {
	const { activeChat } = useStoreSelector(state => state.chats);

	const title = getChatTitle(chat);
	const isSelected = Boolean(activeChat && activeChat.id === chat.id);

	return (
		<div
			className={cn(styles.card, { [styles.card_selected]: isSelected })}
			onClick={() => onClick(chat.id)}
		>
			<Avatar
				className={styles.card__image}
				src={undefined}
				alt={undefined}
			>
				{title}
			</Avatar>

			<div className={styles.card__info}>
				<div className={styles.card__top}>
					<p>{title}</p>
					<p className={styles["card__top-updated"]}>
						{getLastUpdatedTime(chat.updated_at)}
					</p>
				</div>

				<div className={styles.card__bottom}>
					<p className={styles["card__bottom-text"]}>{chat.last_message?.text}</p>
				</div>
			</div>
		</div>
	);
};

export default ChatCard;
