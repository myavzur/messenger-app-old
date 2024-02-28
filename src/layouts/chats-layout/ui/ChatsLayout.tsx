import React from "react";
import { Outlet } from "react-router-dom";

import { ChatsSidebar } from "@/widgets/sidebar/chats-sidebar/ui";
import { PreferencesSidebar } from "@/widgets/sidebar/preferences-sidebar/ui";
import { ProfileEditSidebar } from "@/widgets/sidebar/profile-edit-sidebar/ui";
import { ProfileSidebar } from "@/widgets/sidebar/profile-sidebar/ui";

import { useAuth } from "@/entities/user/lib/hooks";

import { useStoreSelector } from "@/shared/lib/hooks";

import styles from "./ChatsLayout.module.scss";

export const ChatsLayout: React.FC = () => {
	const { currentUser } = useAuth();

	const leftSidebarView = useStoreSelector(state => state.settings.leftSidebarView);

	const renderSidebarContent = () => {
		switch (leftSidebarView) {
			case "chats":
				return <ChatsSidebar />;
			case "profile": {
				if (!currentUser) return "No access...";
				return <ProfileSidebar user={currentUser} />;
			}
			case "profile/edit":
				return <ProfileEditSidebar />;
			case "preferences":
				return <PreferencesSidebar />;
			default:
				return "Something went wrong";
		}
	};

	return (
		<div className={styles.layout}>
			<aside className={styles.layout__aside}>{renderSidebarContent()}</aside>

			<main className={styles.layout__main}>
				<Outlet />
			</main>
		</div>
	);
};
