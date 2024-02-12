import cn from "classnames";
import React, { Children, forwardRef } from "react";

import defaultStyles from "@/shared/styles/Field.module.scss";

import { IFieldProps } from "./Field.interface";

export const Field = forwardRef<HTMLInputElement, IFieldProps>((props, ref) => {
	const { isInvalid, className, type, children, ...inputProps } = props;

	return (
		<div
			className={cn(
				defaultStyles.field,
				{
					[defaultStyles.field_invalid]: isInvalid,
					[defaultStyles["field_prevent-pr"]]: Children.count(children) > 0
				},
				className
			)}
		>
			<input
				{...inputProps}
				className={defaultStyles.field__input}
				type={type}
				ref={ref}
			/>

			{children}
		</div>
	);
});

Field.displayName = "Field";
