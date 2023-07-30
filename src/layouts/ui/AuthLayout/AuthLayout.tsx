import React from "react";

import { IAuthLayoutProps } from "./AuthLayout.interface";

import styles from "./AuthLayout.module.scss";

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<main className={styles.layout__content}> {children} </main>
			<aside className={styles.layout__view} />
		</div>
	);
};

export default AuthLayout;
