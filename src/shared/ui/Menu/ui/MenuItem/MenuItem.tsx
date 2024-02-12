import cn from "classnames";
import React from "react";

import { IMenuItemProps } from "./MenuItem.interface";

import styles from "./MenuItem.module.scss";

export const MenuItem: React.FC<IMenuItemProps> = ({
	iconElement,
	label,
	onClick,
	isDangerous = false
}) => {
	return (
		<button
			type="button"
			key={label}
			className={cn(styles.item, {
				[styles.item_dangerous]: isDangerous
			})}
			onClick={onClick}
		>
			<div className={styles.item__icon}>{iconElement}</div>
			<p className={styles.item__label}>{label}</p>
		</button>
	);
};
