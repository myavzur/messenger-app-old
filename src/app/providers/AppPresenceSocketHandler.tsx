import React, { useEffect } from "react";

import { useSockets, useStoreDispatch } from "@/shared/lib/hooks";
import { updateLocalChatPresence } from "@/shared/models/chats";

interface IAppPresenceSocketHandlerProps {
	children: React.ReactNode;
}

const AppPresenceSocketHandler: React.FC<IAppPresenceSocketHandlerProps> = ({
	children
}) => {
	const dispatch = useStoreDispatch();
	const { presenceSocket } = useSockets();

	useEffect(() => {
		if (!presenceSocket) return;

		presenceSocket.on("new-status-in-local-chat", data => {
			dispatch(updateLocalChatPresence(data));
		});
	}, []);

	return <React.Fragment>{children}</React.Fragment>;
};

export default AppPresenceSocketHandler;
