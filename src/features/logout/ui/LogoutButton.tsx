import { LogoutOutlined } from "@ant-design/icons";
import { ActionIcon } from "@mantine/core";
import React from "react";

import { removeAccessToken } from "@/shared/lib/helpers";
import { useAuth, useSockets } from "@/shared/lib/hooks";

const LogoutButton: React.FC = () => {
	const { disconnectAll } = useSockets();
	const { refetchCurrentUser } = useAuth();

	const handleLogout = () => {
		removeAccessToken();
		disconnectAll();
		refetchCurrentUser();
	};

	return (
		<ActionIcon
			onClick={handleLogout}
			color="red"
			variant="outline"
		>
			<LogoutOutlined size={20} />
		</ActionIcon>
	);
};

export default LogoutButton;
