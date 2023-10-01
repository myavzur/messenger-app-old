import cn from "classnames";
import React from "react";

import { Avatar } from "@/shared/ui";

import { IUserBadgeProps } from "./UserBadge.interface";

import styles from "./UserBadge.module.scss";

export const UserBadge: React.FC<IUserBadgeProps> = ({
	account_name,
	avatar_url,
	className,
	onClick
}) => {
	return (
		<div
			className={cn(styles.badge, className)}
			onClick={onClick}
		>
			<Avatar
				className={styles.badge__avatar}
				src={avatar_url}
				alt={account_name}
				size="xs"
			>
				{account_name}
			</Avatar>
			<div className={styles.badge__name}>{account_name}</div>
		</div>
	);
};
