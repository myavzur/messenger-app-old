import React from "react";

import { IFieldLegendProps } from "./FieldLegend.interface";

import styles from "./FieldLegend.module.scss";

const FieldLegend: React.FC<IFieldLegendProps> = ({
	legend,
	description,
	errorText,
	children
}) => {
	return (
		<label className={styles.field}>
			{legend && <legend className={styles.field__legend}>{legend}</legend>}
			{description && <p className={styles.field__description}>{description}</p>}
			{children}
			{errorText && <p className={styles.field__error}>{errorText}</p>}
		</label>
	);
};

export default FieldLegend;
