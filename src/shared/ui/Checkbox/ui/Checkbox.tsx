import classNames from "classnames";
import React from "react";

import { ICheckboxProps } from "./Checkbox.interface";

import styles from "./Checkbox.module.scss";

export const Checkbox: React.FC<ICheckboxProps> = props => {
	const { title, className, ...checkboxInputAttributes } = props;

	return (
		<label className={classNames(styles.checkbox, className)}>
			<input
				{...checkboxInputAttributes}
				className={styles.checkbox__input}
				type="checkbox"
			/>

			<div className={styles.checkbox__marker} />

			{title && (
				<div className={styles.checkbox__info}>
					<span className={styles["checkbox__info-title"]}>{title}</span>
				</div>
			)}
		</label>
	);
};
