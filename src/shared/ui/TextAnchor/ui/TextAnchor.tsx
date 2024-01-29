import React from "react";
import { Link } from "react-router-dom";

import { ITextAnchorProps } from "./TextAnchor.interface";

import styles from "./TextAnchor.module.scss";

export const TextAnchor: React.FC<ITextAnchorProps> = ({ children, to }) => {
	return (
		<span className={styles.anchor}>
			<Link to={to}>{children}</Link>
		</span>
	);
};
