import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { ChatCard } from "@/entities/chat/ui";

import { useAuth, useSockets, useStoreSelector } from "@/shared/lib/hooks";

import styles from "./ChatList.module.scss";

export const ChatList: React.FC = () => {
	const { chatSocket } = useSockets();
	const { currentUser } = useAuth();
	const chatList = useStoreSelector(state => state.chats.chatList);

	useEffect(() => {
		if (!chatSocket?.connected) return;

		chatSocket?.emit("get-chats", {
			page: 1,
			limit: 30
		});
	}, [chatSocket]);

	if (!currentUser?.id) return "[ChatList]: Something went wrong!";

	return (
		<div className={styles.sidebar__chats}>
			{chatList.length > 0 &&
				chatList.map(chat => {
					return (
						<NavLink
							key={chat.id}
							to={`/chats/${chat.id}`}
						>
							{status => (
								<ChatCard
									currentUserId={currentUser.id}
									isSelected={status.isActive}
									chat={chat}
								/>
							)}
						</NavLink>
					);
				})}
		</div>
	);
};
