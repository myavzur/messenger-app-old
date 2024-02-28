import cn from "classnames";
import React from "react";

import { IMenuItemProps } from "./MenuItem.interface";

import styles from "./MenuItem.module.scss";

export const MenuItem: React.FC<IMenuItemProps> = ({
	iconElement,
	label,
	onClick,
	isDangerous = false,
	isDisabled = false
}) => {
	const handleClick = () => {
		if (isDisabled) return;
		onClick?.();
	};

	return (
		<div
			className={cn(styles.item, {
				[styles.item_dangerous]: isDangerous,
				[styles.item_disabled]: isDisabled
			})}
			onClick={handleClick}
		>
			<div className={styles.item__icon}>{iconElement}</div>
			<p className={styles.item__label}>{label}</p>
		</div>
	);
};
