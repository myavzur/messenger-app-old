import React from "react";

import { ISwitchProps } from "./Switch.interface";

import styles from "./Switch.module.scss";

const Switch: React.FC<ISwitchProps> = props => {
	return (
		<label className={styles.switch}>
			<input
				{...props}
				type="checkbox"
			/>
			<span className={styles.switch__button}></span>
		</label>
	);
};

export default Switch;
