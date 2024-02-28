import React from "react";

import { useAuth } from "@/entities/user/lib/hooks";

import { SectionHeader } from "@/shared/ui";

import { IHeaderProps } from "./ChatHeader.interface";
import { ChatHeaderInfo } from "./ChatHeaderInfo";

// TODO: После рефактора выглядит странно коротко. Поэтому возможно стоит избавиться от ChatHeader и вынести из него отдельный ChatHeaderInfo...?
export const ChatHeader: React.FC<IHeaderProps> = ({ chat, className }) => {
	const { currentUser } = useAuth();
	if (!currentUser?.id) return "[Header]: Something went wrong!";

	return (
		<SectionHeader className={className}>
			<ChatHeaderInfo
				currentUserId={currentUser.id}
				chat={chat}
			/>
		</SectionHeader>
	);
};
