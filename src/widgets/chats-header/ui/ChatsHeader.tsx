import React from "react";

import { Logout } from "@/features/logout";
import { Search } from "@/features/search";

import styles from "./ChatsHeader.module.scss";

export const ChatsHeader: React.FC = () => {
	return (
		<header className={styles.header}>
			<Logout />
			<Search />
		</header>
	);
};
