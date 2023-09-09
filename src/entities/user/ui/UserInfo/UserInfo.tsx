import React from "react";

import { Avatar } from "@/shared/ui";

import { IUserInfoProps } from "./UserInfo.interface";

import styles from "./UserInfo.module.scss";

const UserInfo: React.FC<IUserInfoProps> = ({ user }) => {
	return (
		<div className={styles.info}>
			<Avatar
				src={undefined}
				alt={user.account_name}
				size="sm"
			>
				{user.account_name}
			</Avatar>

			<div className={styles.info__right}>
				<p className={styles["info__account-name"]}>{user.account_name}</p>
				<p className={styles["info__last-seen"]}>last seen recently</p>
			</div>
		</div>
	);
};

export default UserInfo;
