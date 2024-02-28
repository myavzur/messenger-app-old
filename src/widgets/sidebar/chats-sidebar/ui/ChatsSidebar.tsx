import React, { useState } from "react";

import { ChatList } from "@/widgets/chat/chat-list/ui";
import { CreateGroupChatModal } from "@/widgets/modal/create-group-chat-modal/ui";
import { SearchChatsModal } from "@/widgets/modal/search-chats-modal/ui";

import { NavigationButton } from "@/features/app/navigation-button/ui";
import { ThemeSwitch } from "@/features/app/theme-switch/ui";

import { Button, Icon, SectionHeader } from "@/shared/ui";

import styles from "./ChatsSidebar.module.scss";

export const ChatsSidebar: React.FC = () => {
	const [activeModal, setActiveModal] = useState<
		"search-for-chats" | "create-group-chat" | null
	>(null);

	const renderModal = () => {
		if (activeModal === "search-for-chats") {
			return <SearchChatsModal onClose={() => setActiveModal(null)} />;
		}
		if (activeModal === "create-group-chat") {
			return <CreateGroupChatModal onClose={() => setActiveModal(null)} />;
		}
	};

	return (
		<div className={styles.sidebar}>
			<SectionHeader>
				<NavigationButton />

				<Button
					onClick={() => setActiveModal("search-for-chats")}
					iconElement={<Icon name="search-eye" />}
				/>

				<ThemeSwitch />
			</SectionHeader>

			<ChatList />

			<div className={styles["floating-actions-menu-button"]}>
				<Button
					onClick={() => setActiveModal("create-group-chat")}
					iconElement={<Icon name="generate" />}
					isFullRounded={true}
				/>
			</div>

			{renderModal()}
		</div>
	);
};
