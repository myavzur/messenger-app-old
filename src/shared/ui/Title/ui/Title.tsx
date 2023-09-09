import React from "react";

import { ITitleProps } from "./Title.interface";

import styles from "./Title.module.scss";

const Title: React.FC<ITitleProps> = ({ children }) => {
	return <h1 className={styles.title}>{children}</h1>;
};

export default Title;
