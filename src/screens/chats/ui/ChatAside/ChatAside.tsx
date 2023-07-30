import React from "react";

import { LogoutButton } from "@/features/logout";
import { Search } from "@/features/search";

import { ChatCard } from "@/entities/chat";
import { useSelectChat } from "@/entities/chat/lib/hooks";

import { useStoreSelector } from "@/shared/lib/hooks";

import ChatHeader from "../ChatHeader";

import styles from "./ChatAside.module.scss";

const ChatAside: React.FC = () => {
	const { chats } = useStoreSelector(state => state.chats);
	const { selectChat } = useSelectChat();

	return (
		<div className={styles.aside}>
			<ChatHeader>
				<LogoutButton />
				<Search />
			</ChatHeader>

			{chats.length > 0 && (
				<div className={styles.aside__chats}>
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

export default ChatAside;
