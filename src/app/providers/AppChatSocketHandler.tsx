import React, { useEffect } from "react";

import { useSockets, useStoreDispatch } from "@/shared/lib/hooks";
import {
	addChat,
	addMessage,
	setActiveChat,
	setChats,
	updateChatCarefully
} from "@/shared/models/chats";

interface IAppChatSocketHandlerProps {
	children: React.ReactNode;
}

const AppChatSocketHandler: React.FC<IAppChatSocketHandlerProps> = ({
	children
}) => {
	const dispatch = useStoreDispatch();
	const { chatSocket } = useSockets();

	useEffect(() => {
		if (chatSocket) {
			chatSocket.on("chats", data => {
				dispatch(setChats(data.chats));
			});

			chatSocket.on("chat", chat => {
				dispatch(setActiveChat(chat));

				chatSocket.emit("get-chat-history", {
					chatId: chat.id,
					page: 1,
					limit: 25
				});
			});

			chatSocket.on("chat-created", chat => {
				dispatch(addChat(chat));
			});

			chatSocket.on("new-message", data => {
				dispatch(
					addMessage({
						chatId: data.chat_id,
						message: data.message
					})
				);
			});

			chatSocket.on("chat-history", data => {
				dispatch(
					updateChatCarefully({
						chatId: data.chat_id,
						updatedData: {
							messages: data.messages
						}
					})
				);
			});
		}
	}, [chatSocket]);

	return <React.Fragment>{children}</React.Fragment>;
};

export default AppChatSocketHandler;
