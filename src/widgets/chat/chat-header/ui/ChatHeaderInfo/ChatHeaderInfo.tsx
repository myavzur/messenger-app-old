import React from "react";

import { ChatType } from "@/entities/chat/interfaces";
import { serializeChat } from "@/entities/chat/lib/helpers";
import { UserStatus } from "@/entities/user/interfaces";
import { getLastSeenFromDate } from "@/entities/user/lib/helpers";

import { InfoBlock } from "@/shared/ui";

import { IChatHeaderInfoProps } from "./ChatHeaderInfo.interface";

export const ChatHeaderInfo: React.FC<IChatHeaderInfoProps> = ({
	chat,
	currentUserId
}) => {
	const serializedChat = serializeChat({ currentUserId, chat });

	return (
		<InfoBlock
			title={serializedChat.title || "???"}
			subtitle={() => {
				if (serializedChat.type === ChatType.GROUP) {
					return `${serializedChat.participants_count} members`;
				}
				if (serializedChat.user_status === UserStatus.ONLINE) {
					return "online";
				}
				if (serializedChat.user_last_seen_at) {
					return getLastSeenFromDate(serializedChat.user_last_seen_at);
				}
			}}
			imageUrl={serializedChat.image_url}
			status={serializedChat?.user_status}
		/>
	);
};
