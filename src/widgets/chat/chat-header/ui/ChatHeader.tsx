import cn from "classnames";
import React from "react";

import { useAuth } from "@/shared/lib/hooks";

import { IHeaderProps } from "./ChatHeader.interface";
import { ChatHeaderInfo } from "./ChatHeaderInfo";

import styles from "./ChatHeader.module.scss";

export const ChatHeader: React.FC<IHeaderProps> = ({ chat, className }) => {
	const { currentUser } = useAuth();
	if (!currentUser?.id) return "[Header]: Something went wrong!";

	return (
		<header className={cn(styles.header, className)}>
			<ChatHeaderInfo
				currentUserId={currentUser.id}
				chat={chat}
			/>
		</header>
	);
};
