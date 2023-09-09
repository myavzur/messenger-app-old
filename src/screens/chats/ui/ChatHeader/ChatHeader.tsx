import cn from "classnames";
import React from "react";

import { IChatHeaderProps } from "./ChatHeader.interface";

import styles from "./ChatHeader.module.scss";

const ChatHeader: React.FC<IChatHeaderProps> = ({ className, children }) => {
	return <header className={cn(styles.header, className)}>{children}</header>;
};

export default ChatHeader;
