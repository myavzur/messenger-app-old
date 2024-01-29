import React from "react";

import { IFieldActionProps } from "./FieldAction.interface";

import styles from "./FieldAction.module.scss";

export const FieldAction: React.FC<IFieldActionProps> = ({
	iconElement,
	type = "button",
	...buttonProps
}) => {
	return (
		<button
			type={type}
			className={styles.action}
			{...buttonProps}
		>
			{iconElement}
		</button>
	);
};
