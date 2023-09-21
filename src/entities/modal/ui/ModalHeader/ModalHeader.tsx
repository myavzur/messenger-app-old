import React from "react";

import { IModalHeaderProps } from "./ModalHeader.interface";

import styles from "./ModalHeader.module.scss";

const ModalHeader: React.FC<IModalHeaderProps> = ({ onClose, children }) => {
	return (
		<div className={styles.header}>
			<span className={styles.header__title}>{children}</span>

			<button
				className={styles.header__close}
				onClick={onClose}
			>
				X
			</button>
		</div>
	);
};

export default ModalHeader;
