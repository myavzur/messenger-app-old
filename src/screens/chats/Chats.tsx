import { VideoCameraAddOutlined } from "@ant-design/icons";
import {
	ActionIcon,
	Avatar,
	Box,
	Center,
	Flex,
	ScrollArea,
	Stack,
	Text,
	TypographyStylesProvider
} from "@mantine/core";
import React, { useEffect } from "react";

import { ChatsLayout } from "@/layouts";
import PagesLayout from "@/layouts/ui/PagesLayout";

import { LogoutButton } from "@/features/logout";

import { Chat } from "@/entities/chat";

import { baseApi } from "@/shared/api";
import { ISocketsContext } from "@/shared/contexts/SocketsContext";
import { getFirstLetters } from "@/shared/lib/helpers";
import { useSocketsContext } from "@/shared/lib/hooks";

import { useStyles } from "./Chats.styles";

const Chats: React.FC = () => {
	const { classes } = useStyles();

	const { data: user } = baseApi.useGetCurrentUserQuery();
	const { data: chats } = baseApi.useGetChatsQuery(null, { skip: !user });

	const { chatSocket, presenceSocket } = useSocketsContext() as ISocketsContext;

	useEffect(() => {
		// these sockets can't be null since it's always has an instance inside SocketsProvider when user authorized.

		chatSocket!.on("new-message", data => console.log(data));
		presenceSocket!.on("friend-changed-status", data => console.log(data));
	}, []);

	return (
		<PagesLayout>
			<div className={classes.layout}>
				<Flex
					direction="column"
					w={"23%"}
				>
					<Box className={classes.header}>
						<LogoutButton />
					</Box>

					<ScrollArea
						type="never"
						sx={{ flexGrow: 1 }}
					>
						{chats &&
							chats.map(chat => (
								<Chat
									chat={chat}
									key={chat.id}
								/>
							))}
					</ScrollArea>
				</Flex>

				<Box
					sx={theme => ({
						borderLeft: `1px solid ${
							theme.colorScheme === "dark"
								? theme.colors.dark[6]
								: theme.colors.gray[4]
						}`,
						flexGrow: 1
					})}
				>
					<div className={classes.header}>
						<Center>
							<Avatar
								size="lg"
								radius="xl"
								mr="xs"
							>
								{getFirstLetters(user?.account_name)}
							</Avatar>

							<TypographyStylesProvider>
								<Text size="md">{user?.account_name}</Text>
								<Text
									size="xs"
									c="dimmed"
								>
									last seen recently
								</Text>
							</TypographyStylesProvider>
						</Center>

						<Center>
							<ActionIcon>
								<VideoCameraAddOutlined />
							</ActionIcon>
						</Center>
					</div>
				</Box>
			</div>
		</PagesLayout>
	);
};

export default Chats;
