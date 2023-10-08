import React from "react";

import { Avatar } from "@/shared/ui";

import { IInfoBlockProps } from "./InfoBlock.interface";

import styles from "./InfoBlock.module.scss";

export const InfoBlock: React.FC<IInfoBlockProps> = ({
	title,
	subtitle,
	imageUrl,
	status,
	onClick
}) => {
	return (
		<div
			className={styles.info}
			onClick={onClick}
		>
			<Avatar
				src={imageUrl}
				alt={title}
				size="sm"
				status={status}
			>
				{title}
			</Avatar>

			<div className={styles.info__right}>
				<p className={styles["info__account-name"]}>{title}</p>
				<p className={styles["info__last-seen"]}>{subtitle}</p>
			</div>
		</div>
	);
};
