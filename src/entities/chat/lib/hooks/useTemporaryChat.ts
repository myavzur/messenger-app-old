import { useCallback } from "react";

import { IMessage } from "@/shared/interfaces/message.interface";
import { IUser } from "@/shared/interfaces/user.interface";
import { useSockets, useStoreDispatch, useStoreSelector } from "@/shared/lib/hooks";
import { setActiveChat } from "@/shared/models/chats";

/** Хук позволяет создать временный чат с пользователем
 * только на стороне клиента, без использования сервера. */
export const useTemporaryChat = () => {
	const dispatch = useStoreDispatch();
	const { chats, activeChat } = useStoreSelector(state => state.chats);
	const { chatSocket } = useSockets();

	const openTemporaryChat = useCallback((user: IUser) => {
		const isAlreadyOpened = activeChat?.users[0].id === user.id;

		if (!isAlreadyOpened) {
			dispatch(
				setActiveChat({
					users: [user],
					messages: [],
					is_group: false
				})
			);
		}
	}, []);

	const sendMessageAndCreateChat = useCallback(
		(userId: IUser["id"], text: IMessage["text"]) => {
			chatSocket?.emit("send-message", { userId, text });
		},
		[chatSocket]
	);

	return { openTemporaryChat, sendMessageAndCreateChat, chats, activeChat };
};
