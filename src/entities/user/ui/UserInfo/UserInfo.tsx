import { Avatar, Center, Text, TypographyStylesProvider } from "@mantine/core";
import React from "react";

import { getFirstLetters } from "@/shared/lib/helpers";

import { UserInfoProps } from "./UserInfo.interface";

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
	return (
		<Center>
			<Avatar
				size="md"
				radius="xl"
				mr="md"
			>
				{getFirstLetters(user?.account_name)}
			</Avatar>

			<TypographyStylesProvider>
				<Text size="sm">{user?.account_name}</Text>
				<Text
					size="xs"
					c="dimmed"
				>
					last seen recently
				</Text>
			</TypographyStylesProvider>
		</Center>
	);
};

export default UserInfo;
