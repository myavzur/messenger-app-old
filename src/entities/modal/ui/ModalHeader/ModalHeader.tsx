import React from "react";

import { Icon } from "@/shared/ui";

import { IModalHeaderProps } from "./ModalHeader.interface";

import styles from "./ModalHeader.module.scss";

export const ModalHeader: React.FC<IModalHeaderProps> = ({ onClose, children }) => {
	return (
		<div className={styles.header}>
			<h1 className={styles.header__title}>{children}</h1>

			<button
				className={styles.header__close}
				onClick={onClose}
			>
				<Icon name="close" />
			</button>
		</div>
	);
};
