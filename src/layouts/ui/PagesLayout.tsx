import {
	MessageOutlined,
	TeamOutlined,
	VideoCameraOutlined
} from "@ant-design/icons";
import { ActionIcon, Avatar, Box, Flex, Group, Stack } from "@mantine/core";
import React from "react";
import { NavLink } from "react-router-dom";

import { baseApi } from "@/shared/api";
import { getFirstLetters } from "@/shared/lib/helpers";
import { Logo } from "@/shared/ui";

import { IDefaultLayoutProps } from "../interfaces/DefaultLayout.interface";

const PagesLayout: React.FC<IDefaultLayoutProps> = ({ children }) => {
	const { data: user } = baseApi.useGetCurrentUserQuery();

	return (
		<Group
			h="100vh"
			spacing={0}
			grow={false}
		>
			<Stack
				py="xl"
				px="md"
				h="100vh"
				align="center"
				justify="space-between"
				sx={theme => ({
					borderRight: `1px solid ${
						theme.colorScheme === "dark"
							? theme.colors.dark[6]
							: theme.colors.gray[4]
					}`
				})}
			>
				<Logo />

				<Flex
					align="center"
					direction="column"
					gap="md"
				>
					<NavLink to="/">
						{({ isActive }) => (
							<ActionIcon
								title="Chats"
								size="lg"
								color="red"
								variant={isActive ? "filled" : "transparent"}
							>
								<MessageOutlined />
							</ActionIcon>
						)}
					</NavLink>

					<NavLink to="/calls">
						{({ isActive }) => (
							<ActionIcon
								title="Video Calls"
								size="lg"
								color="red"
								variant={isActive ? "filled" : "transparent"}
							>
								<VideoCameraOutlined />
							</ActionIcon>
						)}
					</NavLink>

					<NavLink to="/friend-requests">
						{({ isActive }) => (
							<ActionIcon
								title="Friend Requests"
								size="lg"
								color="red"
								variant={isActive ? "filled" : "transparent"}
							>
								<TeamOutlined />
							</ActionIcon>
						)}
					</NavLink>
				</Flex>

				<Avatar
					radius="xl"
					color="red"
				>
					{getFirstLetters(user!.account_name)}
				</Avatar>
			</Stack>

			<Box sx={{ flexGrow: 1 }}>{children}</Box>
		</Group>
	);
};

export default PagesLayout;
