import React, { forwardRef, useState } from "react";

import { Field, FieldAction, IFieldProps, Icon } from "@/shared/ui";

export const PasswordField = forwardRef<
	HTMLInputElement,
	Omit<IFieldProps, "children">
>((props, ref) => {
	const [isVisible, setVisibility] = useState(false);

	const handleToggleVisibility = () => {
		setVisibility(visibility => !visibility);
	};

	const iconElement = isVisible ? <Icon name="eye" /> : <Icon name="eye-crossed" />;

	return (
		<Field
			{...props}
			ref={ref}
			type={isVisible ? "text" : "password"}
			autoComplete="new-off"
		>
			<FieldAction
				iconElement={iconElement}
				wrapperProps={{
					onClick: handleToggleVisibility
				}}
			/>
		</Field>
	);
});

PasswordField.displayName = "PasswordField";
