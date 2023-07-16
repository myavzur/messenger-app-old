import React from "react";

import { ButtonProps } from "./Button.interface";
import styles from "./Button.module.scss";

const Button: React.FC<ButtonProps> = ({ icon: Icon, onClick, children, ...buttonProps }) => {
	return (
		<button
			{...buttonProps}
			onClick={onClick}
			className={styles.button}
		>
			{Icon && (
				<div className={styles.button__icon}>{Icon}</div>
			)}

			<span className={styles.button__text}>{children}</span>
		</button>
	);
};

export default Button;