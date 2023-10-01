import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { ChatsList } from "@/widgets/chats-list";
import { CreateGroupChatModal } from "@/widgets/create-group-chat-modal";
import { SearchChatsModal } from "@/widgets/search-chats-modal";

import { Logout } from "@/features/logout";

import { useTheme } from "@/shared/lib/hooks";
import { Button, Icon, Switch } from "@/shared/ui";

import styles from "./ChatsLayout.module.scss";

const ChatsLayout: React.FC = () => {
	const { theme, toggleTheme } = useTheme();

	const [isSearching, setSearching] = useState(false);
	const [isCreating, setCreating] = useState(false);

	return (
		<div className={styles.layout}>
			<aside className={styles.layout__aside}>
				<header className={styles.layout__header}>
					<Logout />

					<Button
						onClick={() => setSearching(true)}
						icon={<Icon name="search-eye" />}
					/>
					<Switch
						checked={theme === "insomnia"}
						onChange={() => toggleTheme()}
					/>
				</header>

				<ChatsList />

				<Button
					className={styles["create-chat-button"]}
					onClick={() => setCreating(true)}
					icon={<Icon name="generate" />}
					isFullyRounded={true}
				/>
			</aside>

			<main className={styles.layout__main}>
				<Outlet />
			</main>

			{isSearching && <SearchChatsModal onClose={() => setSearching(false)} />}
			{isCreating && <CreateGroupChatModal onClose={() => setCreating(false)} />}
		</div>
	);
};

export default ChatsLayout;
