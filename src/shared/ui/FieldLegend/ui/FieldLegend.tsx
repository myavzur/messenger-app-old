import classNames from "classnames";
import React from "react";

import { IFieldLegendProps } from "./FieldLegend.interface";

import styles from "./FieldLegend.module.scss";

export const FieldLegend: React.FC<IFieldLegendProps> = ({
	legend,
	description,
	withAsterisk,
	errorText,
	children
}) => {
	return (
		<label
			className={classNames(styles.field, {
				[styles["field_with-asterisk"]]: withAsterisk
			})}
		>
			{legend && <legend className={styles.field__legend}>{legend}</legend>}
			{description && <p className={styles.field__description}>{description}</p>}
			{children}
			{errorText && <p className={styles.field__error}>{errorText}</p>}
		</label>
	);
};
