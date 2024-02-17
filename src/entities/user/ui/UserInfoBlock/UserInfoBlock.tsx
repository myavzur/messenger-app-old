import React from "react";

import { InfoBlock } from "@/shared/ui";

import { IUserInfoBlockProps } from "./UserInfoBlock.interface";

export const UserInfoBlock: React.FC<IUserInfoBlockProps> = ({ user, onClick }) => {
	return (
		<InfoBlock
			title={user.account_name}
			subtitle={user.email}
			imageUrl={user.avatar?.file_url}
			onClick={() => onClick?.(user)}
		/>
	);
};
