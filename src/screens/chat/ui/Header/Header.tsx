import { VideoCameraAddOutlined } from "@ant-design/icons";
import cn from "classnames";
import React from "react";

import { ChatCard, ChatInfoBlock, serializeChat } from "@/entities/chat";
import { UserInfoBlock } from "@/entities/user/ui/UserInfoBlock";

import { useAuth } from "@/shared/lib/hooks";

import { IHeaderProps } from "./Header.interface";

import styles from "./Header.module.scss";

export const Header: React.FC<IHeaderProps> = ({ chat, className }) => {
	const { currentUser } = useAuth();
	const currentUserId = currentUser!.id;

	return (
		<header className={cn(styles.header, className)}>
			<ChatInfoBlock
				currentUserId={currentUserId}
				chat={chat}
			/>

			<div className={styles.chat__actions}>
				<VideoCameraAddOutlined size={20} />
			</div>
		</header>
	);
};
