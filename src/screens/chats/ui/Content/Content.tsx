import React from "react";

import { ChatHeader } from "@/widgets/chat-header";
import { ChatMessages } from "@/widgets/chat-messages";

import { SendMessageForm } from "@/features/send-message-form";

import { useAuth, useStoreSelector } from "@/shared/lib/hooks";

import styles from "./Content.module.scss";

export const Content: React.FC = () => {
	const { activeChat } = useStoreSelector(state => state.chats);
	const { currentUser } = useAuth();

	return (
		<div className={styles.content}>
			<div className={styles["content__background-filter"]} />

			{activeChat && (
				<>
					<ChatHeader
						chat={activeChat}
						className={styles.content__header}
					/>

					{activeChat.messages && (
						<ChatMessages
							className={styles.content__messages}
							messages={activeChat.messages}
							userId={currentUser!.id}
						/>
					)}

					<SendMessageForm className={styles.content__form} />
				</>
			)}
		</div>
	);
};
