import { LogoutOutlined } from "@ant-design/icons";
import React from "react";

import { removeAccessToken } from "@/shared/lib/helpers";
import { useAuth, useSockets, useStoreDispatch } from "@/shared/lib/hooks";
import { clearChats } from "@/shared/models/chats";
import { Button } from "@/shared/ui";

export const Logout: React.FC = () => {
	const dispatch = useStoreDispatch();

	const { disconnectAll } = useSockets();
	const { refetchCurrentUser } = useAuth();

	const handleLogout = () => {
		removeAccessToken();
		disconnectAll();
		refetchCurrentUser();
		dispatch(clearChats());
	};

	return (
		<Button
			onClick={handleLogout}
			icon={<LogoutOutlined size={20} />}
		/>
	);
};
