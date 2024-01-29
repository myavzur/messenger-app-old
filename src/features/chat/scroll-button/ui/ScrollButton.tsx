import React from "react";

import { Button, IButtonProps, Icon } from "@/shared/ui";

import styles from "./ScrollButton.module.scss";

export const ScrollButton: React.FC<IButtonProps> = buttonProps => {
	return (
		<Button
			{...buttonProps}
			iconElement={<Icon name="double-arrow" />}
			className={styles["scroll-button"]}
		/>
	);
};
