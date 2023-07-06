import {
	Avatar,
	Group
} from "@mantine/core";
import dayjs from "dayjs";
import React from "react";

import { getFirstLetters } from "@/shared/lib/helpers";

import { ChatCardProps } from "./ChatCard.interface";
import { useStyles } from "./CharCard.styles";
import { ThemedText } from "@/shared/ui";

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
				<ThemedText size="sm">
					{isConversation ? chat.users[0].account_name : "Design Team"}
				</ThemedText>
				<ThemedText
					size="sm"
					c="dimmed"
				>
					{dayjs(chat.updated_at).format("h:mm A")}
				</ThemedText>
			</Group>

			<ThemedText
				c="dimmed"
				size="sm"
				truncate
			>
				{chat.last_message.text}
			</ThemedText>
		</Group>
	);
};

export default ChatCard;
