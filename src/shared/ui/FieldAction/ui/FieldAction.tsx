import React, { forwardRef } from "react";

import { IFieldActionProps } from "./FieldAction.interface";

import styles from "./FieldAction.module.scss";

export const FieldAction = forwardRef<HTMLDivElement, IFieldActionProps>(
	(props, ref) => {
		const { wrapperProps, buttonProps, iconElement, children } = props;

		return (
			<div
				ref={ref}
				className={styles.action}
				{...wrapperProps}
			>
				<button
					type={buttonProps?.type || "button"}
					className={styles.action__button}
					{...buttonProps}
				>
					{iconElement}
				</button>

				{children}
			</div>
		);
	}
);

FieldAction.displayName = "FieldAction";
