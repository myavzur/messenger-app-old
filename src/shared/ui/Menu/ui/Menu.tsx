import cn from "classnames";
import React, { forwardRef } from "react";

import { IMenuProps } from "./Menu.interface";

import styles from "./Menu.module.scss";

export const Menu = forwardRef<HTMLDivElement, IMenuProps>((props, ref) => {
	const { className, children } = props;

	return (
		<div
			{...props}
			ref={ref}
			className={cn(styles.menu, className)}
		>
			{children}
		</div>
	);
});

Menu.displayName = "Menu";
