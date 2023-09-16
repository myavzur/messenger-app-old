import { VideoCameraAddOutlined } from "@ant-design/icons";
import cn from "classnames";
import React from "react";

import { ChatCard } from "@/entities/chat";
import { UserCard } from "@/entities/user/ui/UserCard";

import { IChatHeaderProps } from "./ChatHeader.interface";

import styles from "./ChatHeader.module.scss";

export const ChatHeader: React.FC<IChatHeaderProps> = ({ chat, className }) => {
	return (
		<header className={cn(styles.header, className)}>
			{chat.is_group ? (
				<ChatCard
					chat={chat}
					onClick={() => console.log("chat clicked lol")}
				/>
			) : (
				<UserCard user={chat.users[0]} />
			)}

			<div className={styles.chat__actions}>
				<VideoCameraAddOutlined size={20} />
			</div>
		</header>
	);
};
