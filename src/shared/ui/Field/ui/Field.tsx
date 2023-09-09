import cn from "classnames";
import React, { forwardRef } from "react";

import { IFieldProps } from "./Field.interface";

import styles from "./Field.module.scss";

const Field = forwardRef<HTMLInputElement, IFieldProps>((props, ref) => {
	const { isInvalid, className, type, children, ...inputProps } = props;

	return (
		<div
			className={cn(
				styles.field,
				{
					[styles.field_invalid]: isInvalid
				},
				className
			)}
		>
			<input
				{...inputProps}
				type={type}
				ref={ref}
			/>

			{children}
		</div>
	);
});

Field.displayName = "Field";

export default Field;