import React from "react";

import { AvatarCircle } from "@/entities/attachment/ui";

import { IInfoBlockProps } from "./InfoBlock.interface";

import styles from "./InfoBlock.module.scss";

export const InfoBlock: React.FC<IInfoBlockProps> = ({
	title,
	subtitle,
	image,
	status,
	onClick
}) => {
	const subtitleText = typeof subtitle === "function" ? subtitle() : subtitle;

	return (
		<div
			className={styles.info}
			onClick={onClick}
		>
			<AvatarCircle
				placeholderSvgText={title}
				attachment={image}
				status={status}
				size="sm"
			/>

			<div className={styles.info__right}>
				<p className={styles["info__account-name"]}>{title}</p>
				<p className={styles["info__last-seen"]}>{subtitleText}</p>
			</div>
		</div>
	);
};
