import { VideoCameraAddOutlined } from "@ant-design/icons";
import cn from "classnames";
import React from "react";

import { ChatCard, serializeChat } from "@/entities/chat";
import { UserCard } from "@/entities/user/ui/UserCard";

import { useAuth } from "@/shared/lib/hooks";

import { IHeaderProps } from "./Header.interface";

import styles from "./Header.module.scss";

export const Header: React.FC<IHeaderProps> = ({ chat, className }) => {
	const { currentUser } = useAuth();

	return (
		<header className={cn(styles.header, className)}>
			{chat.is_group ? (
				<ChatCard
					currentUserId={currentUser!.id}
					chat={chat}
					onClick={() => console.log("chat clicked lol")}
				/>
			) : (
				<UserCard user={chat.users.find(user => user.id !== currentUser!.id)!} />
			)}

			<div className={styles.chat__actions}>
				<VideoCameraAddOutlined size={20} />
			</div>
		</header>
	);
};
