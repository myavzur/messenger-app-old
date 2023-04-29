import { LogoutOutlined } from "@ant-design/icons";
import { ActionIcon } from "@mantine/core";
import React from "react";

import { baseApi } from "@/shared/api";
import { ISocketsContext } from "@/shared/contexts/SocketsContext";
import { removeAccessToken } from "@/shared/lib/helpers";
import { useSocketsContext } from "@/shared/lib/hooks";

const LogoutButton: React.FC = () => {
	const { disconnectAll } = useSocketsContext() as ISocketsContext;
	const { refetch: refetchUser } = baseApi.useGetCurrentUserQuery();

	const handleLogout = () => {
		removeAccessToken();
		disconnectAll();
		refetchUser();
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
