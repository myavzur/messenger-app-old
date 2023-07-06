import { VideoCameraAddOutlined } from "@ant-design/icons";
import { ActionIcon, Box, Center, Flex, ScrollArea } from "@mantine/core";
import React, { useEffect } from "react";

import { MainLayout } from "@/layouts";

import { LogoutButton } from "@/features/logout";

import { ChatCard } from "@/entities/chat";
import { UserInfo } from "@/entities/user";

import { baseApi } from "@/shared/api";
import { ISocketsContext } from "@/shared/contexts/SocketsContext";
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
		<MainLayout
			asideContent={
				<React.Fragment>
					<Box className={classes.header}>
						<LogoutButton />
					</Box>

					{chats?.length ? (
						<ScrollArea
							type="never"
							sx={{ flexGrow: 1 }}
							p="sm"
						>
							{chats.map(chat => (
								<ChatCard
									chat={chat}
									key={chat.id}
								/>
							))}
						</ScrollArea>
					) : null}
				</React.Fragment>
			}
			mainContent={
				<React.Fragment>
					<div className={classes.header}>
						{user && <UserInfo user={user} />}

						<Center>
							<ActionIcon size="md">
								<VideoCameraAddOutlined />
							</ActionIcon>
						</Center>
					</div>
				</React.Fragment>
			}
		/>
	);
};

export default Chats;
