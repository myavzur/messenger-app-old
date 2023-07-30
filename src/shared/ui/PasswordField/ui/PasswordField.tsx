import React, { forwardRef, useState } from "react";

import { Field, Icon } from "@/shared/ui";

import { FieldProps } from "../../Field";

import styles from "./PasswordField.module.scss";

const PasswordField = forwardRef<HTMLInputElement, Omit<FieldProps, "children">>(
	(props, ref) => {
		const [isVisible, setVisibility] = useState(false);

		const handleToggleVisibility = () => {
			setVisibility(visibility => !visibility);
		};

		return (
			<Field
				{...props}
				className={styles.field}
				ref={ref}
				type={isVisible ? "text" : "password"}
				autoComplete="new-off"
			>
				<button
					type="button"
					className={styles.field__toggler}
					onClick={handleToggleVisibility}
				>
					{isVisible ? <Icon name="eye" /> : <Icon name="eye-crossed" />}
				</button>
			</Field>
		);
	}
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
