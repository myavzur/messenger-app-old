import React from "react";

import { removeAccessToken } from "@/shared/lib/helpers";
import { useAuth, useSockets, useStoreDispatch } from "@/shared/lib/hooks";
import { chatActions } from "@/shared/models/chats";
import { Button, Icon } from "@/shared/ui";

export const Logout: React.FC = () => {
	const dispatch = useStoreDispatch();

	const { disconnectAll } = useSockets();
	const { refetchCurrentUser } = useAuth();

	const handleLogout = () => {
		removeAccessToken();
		disconnectAll();
		refetchCurrentUser();
		dispatch(chatActions.clearChats());
	};

	return (
		<Button
			color="dangerous"
			onClick={handleLogout}
			iconElement={<Icon name="door-out" />}
		/>
	);
};
