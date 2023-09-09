import React from "react";

import { IButtonProps } from "./Button.interface";

import styles from "./Button.module.scss";

const Button: React.FC<IButtonProps> = ({
	icon: Icon,
	onClick,
	children,
	...IButtonProps
}) => {
	return (
		<button
			{...IButtonProps}
			onClick={onClick}
			className={styles.button}
		>
			{Icon && <div className={styles.button__icon}>{Icon}</div>}

			<span className={styles.button__text}>{children}</span>
		</button>
	);
};

export default Button;
