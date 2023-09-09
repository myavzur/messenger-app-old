import React from "react";

import { IButtonProps } from "@/shared/ui/Button";
import { Button, Icon } from "@/shared/ui";

import styles from "./ScrollButton.module.scss";

const ScrollButton: React.FC<IButtonProps> = (buttonProps) => {
	return (
		<Button
			{...buttonProps}
			icon={<Icon name="double-arrow"/>}
			className={styles['scroll-button']}
		/>
	);
};

export default ScrollButton;