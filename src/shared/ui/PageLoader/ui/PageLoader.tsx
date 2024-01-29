import cn from "classnames";
import React from "react";

import { Logo } from "@/shared/ui";

import { IPageLoaderProps } from "./PageLoader.interface";

import styles from "./PageLoader.module.scss";

export const PageLoader: React.FC<IPageLoaderProps> = ({ isFullScreen }) => {
	return (
		<div className={cn(styles.loader, { [styles.loader_fullscreen]: isFullScreen })}>
			<Logo />
			<span className={styles.loader__circle}></span>
		</div>
	);
};
