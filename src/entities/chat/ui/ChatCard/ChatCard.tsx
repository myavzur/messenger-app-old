import {
	Avatar,
	Group
} from "@mantine/core";
import dayjs from "dayjs";
import React from "react";

import { getFirstLetters } from "@/shared/lib/helpers";

import { ChatCardProps } from "./ChatCard.interface";
import { useStyles } from "./CharCard.styles";

const ChatCard: React.FC<ChatCardProps> = ({ chat }) => {
	const { classes } = useStyles();
	// chat.users.length === 1 because there are no current user in chat.users.
	const isConversation = chat.users.length === 1;

	return (
		<Group p="xs" className={classes["chat-card"]}>
			<Avatar
				size="md"
				radius="xl"
			>
				{getFirstLetters(
					isConversation ? chat.users[0].account_name : "Design Team"
				)}
			</Avatar>


			<Group position="apart">
				<p>
					{isConversation ? chat.users[0].account_name : "Design Team"}
				</p>
				<p>
					{dayjs(chat.updated_at).format("h:mm A")}
				</p>
			</Group>

			<p>
				{chat.last_message.text}
			</p>
		</Group>
	);
};

export default ChatCard;
