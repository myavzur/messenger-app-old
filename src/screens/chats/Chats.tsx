import React, { useEffect } from "react";

import { MainLayout } from "@/layouts";

import { useSockets } from "@/shared/lib/hooks";

import ChatActive from "./ui/ChatActive";
import ChatAside from "./ui/ChatAside";

const Chats: React.FC = () => {
	const { chatSocket } = useSockets();

	useEffect(() => {
		if (chatSocket) {
			chatSocket.emit("get-chats", {
				page: 1,
				limit: 30
			});
		}
	}, [chatSocket]);

	return (
		<MainLayout
			asideContent={<ChatAside />}
			mainContent={<ChatActive />}
		/>
	);
};

export default Chats;
