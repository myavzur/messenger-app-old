import cn from "classnames";
import React from "react";

import { ISectionHeaderProps } from "./SectionHeader.interface";

import styles from "./SectionHeader.module.scss";

export const SectionHeader: React.FC<ISectionHeaderProps> = ({
	className,
	children
}) => {
	return <header className={cn(styles.header, className)}>{children}</header>;
};
