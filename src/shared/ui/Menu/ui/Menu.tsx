import React, { forwardRef } from "react";

import { IMenuProps } from "./Menu.interface";

import styles from "./Menu.module.scss";

export const Menu = forwardRef<HTMLDivElement, IMenuProps>((props, ref) => {
	const { children } = props;

	return (
		<div
			{...props}
			ref={ref}
			className={styles.menu}
		>
			{children}
		</div>
	);
});

Menu.displayName = "Menu";
