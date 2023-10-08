import React from "react";

import { InfoBlock } from "@/shared/ui";

import { serializeChat } from "../../lib/helpers";

import { IChatInfoBlockProps } from "./ChatInfoBlock.interface";

export const ChatInfoBlock: React.FC<IChatInfoBlockProps> = ({
	chat,
	currentUserId
}) => {
	const { serializedChat, userStatus } = serializeChat({
		currentUserId,
		chat
	});

	const subtitle = serializedChat.is_group
		? `${serializedChat.users_count} members`
		: "NOTHING LOL";

	return (
		<InfoBlock
			title={serializedChat.title}
			subtitle={subtitle}
			imageUrl={serializedChat.image_url}
			status={userStatus}
		/>
	);
};
