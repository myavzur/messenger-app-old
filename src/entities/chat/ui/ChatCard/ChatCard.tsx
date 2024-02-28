import cn from "classnames";
import React from "react";

import { AvatarCircle } from "@/entities/attachment/ui";
import { formatUpdatedDate, serializeChat } from "@/entities/chat/lib/helpers";

import { ChatLastMessage } from "../ChatLastMessage";

import { IChatCardProps } from "./ChatCard.interface";

import styles from "./ChatCard.module.scss";

export const ChatCard: React.FC<IChatCardProps> = ({
	currentUserId,
	chat,
	onClick,
	isSelected
}) => {
	const serializedChat = serializeChat({ currentUserId, chat });

	return (
		<div
			className={cn(styles.card, { [styles.card_selected]: isSelected })}
			onClick={() => onClick?.(chat)}
		>
			<AvatarCircle
				placeholderSvgText={serializedChat.title || "???"}
				attachment={serializedChat.image}
				status={serializedChat?.user_status}
			/>

			<div className={styles.card__info}>
				<div className={styles.card__top}>
					<p className={styles["card__top-title"]}>{serializedChat.title}</p>
					{serializedChat.last_message && (
						<p className={styles["card__top-updated"]}>
							{formatUpdatedDate(serializedChat.last_message.created_at)}
						</p>
					)}
				</div>

				<div className={styles.card__bottom}>
					<ChatLastMessage
						isSelected={isSelected}
						chat={serializedChat}
						currentUserId={currentUserId}
					/>
				</div>
			</div>
		</div>
	);
};
