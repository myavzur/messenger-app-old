import React from "react";

import { Icon } from "@/shared/ui";

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
				<Icon name="close" />
			</button>
		</div>
	);
};

export default ModalHeader;
