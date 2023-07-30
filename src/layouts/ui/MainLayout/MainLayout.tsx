import React from "react";

import { IMainLayoutProps } from "./MainLayout.interface";

import styles from "./MainLayout.module.scss";

const MainLayout: React.FC<IMainLayoutProps> = ({ asideContent, mainContent }) => {
	return (
		<div className={styles.layout}>
			<aside className={styles.layout__aside}>{asideContent}</aside>

			<main className={styles.layout__main}>{mainContent}</main>
		</div>
	);
};

export default MainLayout;
