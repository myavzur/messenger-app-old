import cn from "classnames";
import React from "react";

import { IDropdownProps } from "./Dropdown.interface";

import styles from "./Dropdown.module.scss";

export const Dropdown: React.FC<IDropdownProps> = ({ items }) => {
	return (
		<ul className={styles.dropdown}>
			{items.map(item => (
				<li
					className={cn(styles.dropdown__item, {
						[styles["dropdown__item_dangerous"]]: item.isDangerous
					})}
					onClick={item.onClick}
				>
					<div className={styles["dropdown__item-icon"]}>{item.icon}</div>
					<span className={styles["dropdown__item-title"]}>{item.title}</span>
				</li>
			))}
		</ul>
	);
};
