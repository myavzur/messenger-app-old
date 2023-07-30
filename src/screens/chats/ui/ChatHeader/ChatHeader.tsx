import React from "react";

import { ChatHeaderProps } from "./ChatHeader.interface";

import styles from "./ChatHeader.module.scss";
import cn from "classnames";

const ChatHeader: React.FC<ChatHeaderProps> = ({ className, children }) => {
	return (
		<header
			className={cn(
				styles.header,
				className
			)}
		>
			{children}
		</header>
	)
};

export default ChatHeader;
