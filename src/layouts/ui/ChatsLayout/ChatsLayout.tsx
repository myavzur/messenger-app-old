import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { ChatsList } from "@/widgets/chats-list";

import { Logout } from "@/features/logout";
import { SearchChatsModal } from "@/features/search-chats-modal";

import { Button, Icon } from "@/shared/ui";

import styles from "./ChatsLayout.module.scss";

const ChatsLayout: React.FC = () => {
	const [isSearching, setSearching] = useState(false);

	return (
		<div className={styles.layout}>
			<aside className={styles.layout__aside}>
				<header className={styles.layout__header}>
					<Logout />
					<Button
						onClick={() => setSearching(true)}
						icon={<Icon name="search-eye" />}
					/>
				</header>

				<ChatsList />
			</aside>

			<main className={styles.layout__main}>
				<Outlet />
			</main>

			{isSearching && <SearchChatsModal onClose={() => setSearching(false)} />}
		</div>
	);
};

export default ChatsLayout;
