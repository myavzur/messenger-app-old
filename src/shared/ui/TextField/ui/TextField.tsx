import React, { forwardRef } from "react";

import { TextFieldProps } from "./TextField.interface";
import styles from "./TextField.module.scss";
import cn from "classnames";

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	(props, ref) => {
		const { label, description, children, error, required, type = 'text', ...inputProps } = props;

		return (
			<div 
				className={cn(styles.field, {
					[styles.field_invalid]: Boolean(error),
					[styles.field_required]: required
				})}
			>
				<label className={styles.field__label}>{label}</label>
				<p className={styles.field__description}>{description}</p>

				<div className={styles['field__input-wrapper']}>
					<input
						{...inputProps}
						type={type}
						ref={ref}
					/>
					
					{children && (
						<div className={styles['field__input-actions']}>
							{children}
						</div>
					)}
				</div>

				{error && (
					<p className={styles.field__error}>{error}</p>
				)}
			</div>
		)
	}
)

TextField.displayName = 'TextField';

export default TextField;