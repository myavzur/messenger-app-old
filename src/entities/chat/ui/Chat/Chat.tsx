import {
	Avatar,
	Box,
	Center,
	Group,
	Text,
	TypographyStylesProvider
} from "@mantine/core";
import React from "react";

import { getFirstLetters } from "@/shared/lib/helpers";

import { ChatProps } from "./Chat.interface";
import dayjs from "dayjs";

// TODO: Rename to ChatCard is better.
const Chat: React.FC<ChatProps> = ({ chat }) => {
	// chat.users.length === 1 because there are no current user in chat.users.
	const isConversation = chat.users.length === 1;

	return (
		<Group
			p="xs"
		>
			<Avatar
				size="lg"
				radius="xl"
			>
				{getFirstLetters(isConversation ? chat.users[0].account_name : "Design Team")}
			</Avatar>

			<TypographyStylesProvider>
				<Group position="apart">
					<Text size="xl">{isConversation ? chat.users[0].account_name : "Design Team"}</Text>
					<Text
						size="md"
						c="dimmed"
					>
						{dayjs(chat.updated_at).format("h:mm A")}
					</Text>
				</Group>

				<Text
					c="dimmed"
					size="md"
					truncate
				>
					{chat.last_message.text}
				</Text>
			</TypographyStylesProvider>
		</Group>
	);
};

export default Chat;
