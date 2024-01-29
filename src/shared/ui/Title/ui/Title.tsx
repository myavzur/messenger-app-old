import cn from "classnames";
import React from "react";

import { ITitleProps } from "./Title.interface";

import styles from "./Title.module.scss";

export const Title: React.FC<ITitleProps> = ({ children, className }) => {
	return <h1 className={cn(styles.title, className)}>{children}</h1>;
};
