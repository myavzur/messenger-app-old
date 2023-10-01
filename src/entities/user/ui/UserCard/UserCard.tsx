import React from "react";

import { Avatar } from "@/shared/ui";

import { IUserCardProps } from "./UserCard.interface";

import styles from "./UserCard.module.scss";

export const UserCard: React.FC<IUserCardProps> = ({ user, onClick }) => {
	return (
		<div
			className={styles.card}
			onClick={() => onClick?.(user)}
		>
			<Avatar
				src={user.avatar_url}
				alt={user.account_name}
				size="sm"
				status={user.status}
			>
				{user.account_name}
			</Avatar>

			<div className={styles.card__right}>
				<p className={styles["card__account-name"]}>{user.account_name}</p>
				<p className={styles["card__last-seen"]}>last seen recently</p>
			</div>
		</div>
	);
};
