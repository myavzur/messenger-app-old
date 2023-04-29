import { ManagerOptions, SocketOptions } from "socket.io-client";

export const getSocketOptions = (
	accessToken: string
): Partial<ManagerOptions & SocketOptions> => ({
	extraHeaders: {
		Authorization: `Bearer ${accessToken}`
	}
});
