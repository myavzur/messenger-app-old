import cn from "classnames";
import React, { Children, forwardRef } from "react";

import styles from "@/shared/styles/Field.module.scss";

import { IFieldProps } from "./Field.interface";

export const Field = forwardRef<HTMLInputElement, IFieldProps>((props, ref) => {
	const { isInvalid, className, type, children, ...inputProps } = props;

	return (
		<div
			className={cn(
				styles.field,
				{
					[styles.field_invalid]: isInvalid,
					[styles["field_prevent-pr"]]: Children.count(children) > 0
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
