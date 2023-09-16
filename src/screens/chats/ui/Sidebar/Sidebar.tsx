import React, { useEffect } from "react";

import { ChatsHeader } from "@/widgets/chats-header";

import { ChatCard } from "@/entities/chat";
import { useSelectChat } from "@/entities/chat/lib/hooks";

import { useSockets, useStoreSelector } from "@/shared/lib/hooks";

import styles from "./Sidebar.module.scss";

export const Sidebar: React.FC = () => {
	const { chatSocket } = useSockets();
	const { chats } = useStoreSelector(state => state.chats);
	const { selectChat } = useSelectChat();

	useEffect(() => {
		if (chatSocket) {
			chatSocket.emit("get-chats", {
				page: 1,
				limit: 30
			});
		}
	}, [chatSocket]);

	return (
		<div className={styles.sidebar}>
			<ChatsHeader />

			{chats.length > 0 && (
				<div className={styles.sidebar__chats}>
					{chats.map(chat => (
						<ChatCard
							key={chat.id}
							chat={chat}
							onClick={selectChat}
						/>
					))}
				</div>
			)}
		</div>
	);
};
