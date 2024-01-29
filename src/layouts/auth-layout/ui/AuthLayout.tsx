import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./AuthLayout.module.scss";

export const AuthLayout: React.FC = () => {
	return (
		<div className={styles.layout}>
			<main className={styles.layout__main}>
				<div className={styles.layout__content}>
					<Outlet />
				</div>
			</main>
			<aside className={styles.layout__view} />
		</div>
	);
};
