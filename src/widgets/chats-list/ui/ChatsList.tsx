import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { ChatCard } from "@/entities/chat";

import { IChat } from "@/shared/interfaces/chat.interface";
import { useSockets, useStoreSelector } from "@/shared/lib/hooks";

import styles from "./ChatsList.module.scss";

export const ChatsList: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { chatSocket } = useSockets();
	const { chats } = useStoreSelector(state => state.chats);

	const handleSelectChat = (chatId: IChat["id"]) => {
		// Do nothing if chat already opened.
		if (location.pathname === `/chats/${chatId}`) return;

		navigate(`/chats/${chatId}`);
	};

	useEffect(() => {
		if (!chatSocket?.connected) return;

		chatSocket?.emit("get-chats", {
			page: 1,
			limit: 30
		});
	}, [chatSocket?.connected]);

	return (
		<div className={styles.sidebar__chats}>
			{chats.length > 0 &&
				chats.map(chat => (
					<NavLink
						to={`/chats/${chat.id}`}
						key={chat.id}
					>
						{status => (
							<ChatCard
								isSelected={status.isActive}
								chat={chat}
								onClick={handleSelectChat}
							/>
						)}
					</NavLink>
				))}
		</div>
	);
};
