import cn from "classnames";
import React from "react";

import { Avatar } from "@/shared/ui";

import { IOptionProps } from "./Option.interface";

import styles from "./Option.module.scss";

export const Option: React.FC<IOptionProps> = ({
	onClick,
	className,
	...option
}) => {
	return (
		<div
			className={cn(styles.option, className)}
			onClick={onClick}
		>
			<Avatar
				className={styles.option__image}
				src={option.image_url}
				alt={option.label}
				size="xs"
			>
				{option.label}
			</Avatar>
			<div className={styles.option__label}>{option.label}</div>
		</div>
	);
};
