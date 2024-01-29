import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { ChatList } from "@/widgets/chat/chat-list/ui";
import { CreateGroupChatModal } from "@/widgets/modal/create-group-chat-modal/ui";
import { SearchChatsModal } from "@/widgets/modal/search-chats-modal/ui";

import { ThemeSwitch } from "@/features/app/theme-switch/ui";
import { Logout } from "@/features/user/logout/ui";

import { useAuth } from "@/shared/lib/hooks";
import { Avatar, Button, Icon } from "@/shared/ui";

import styles from "./ChatsLayout.module.scss";

export const ChatsLayout: React.FC = () => {
	const { currentUser } = useAuth();

	const [isSearching, setSearching] = useState(false);
	const [isCreating, setCreating] = useState(false);

	return (
		<div className={styles.layout}>
			<aside className={styles.layout__aside}>
				<header className={styles.layout__header}>
					<Logout />

					<Button
						onClick={() => setSearching(true)}
						iconElement={<Icon name="search-eye" />}
					/>

					<ThemeSwitch />
				</header>

				<ChatList />

				<div className={styles["actions"]}>
					{currentUser && (
						<Avatar
							size="xs"
							src={currentUser?.avatar_url}
							alt={currentUser?.account_name}
						>
							{currentUser?.account_name}
						</Avatar>
					)}

					<Button
						className={styles["create-chat-button"]}
						onClick={() => setCreating(true)}
						iconElement={<Icon name="generate" />}
						isFullRounded={true}
					/>
				</div>
			</aside>

			<main className={styles.layout__main}>
				<Outlet />
			</main>

			{isSearching && <SearchChatsModal onClose={() => setSearching(false)} />}
			{isCreating && <CreateGroupChatModal onClose={() => setCreating(false)} />}
		</div>
	);
};
