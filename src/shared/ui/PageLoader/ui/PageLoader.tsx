import React from "react";

import { Logo } from "@/shared/ui";

import styles from "./PageLoader.module.scss";

const PageLoader: React.FC = () => {
	return (
		<div className={styles.loader}>
			<Logo />
			<span className={styles.loader__circle}></span>
		</div>
	);
};

export default PageLoader;
