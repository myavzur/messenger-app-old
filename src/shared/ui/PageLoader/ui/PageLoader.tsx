import React from "react";

import styles from "./PageLoader.module.scss";

const PageLoader: React.FC = () => {
	return (
		<div className={styles["page-loader"]}>
			LOADING
		</div>
	);
};

export default PageLoader;
