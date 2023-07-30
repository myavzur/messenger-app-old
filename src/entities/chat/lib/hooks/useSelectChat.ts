import { useCallback } from "react";

import { IChat } from "@/shared/interfaces/chat.interface";
import { useSockets, useStoreSelector } from "@/shared/lib/hooks";

export const useSelectChat = () => {
	const { activeChat } = useStoreSelector(state => state.chats);
	const { chatSocket } = useSockets();

	const selectChat = useCallback(
		(id: IChat["id"]) => {
			if (activeChat?.id === id) return;
			chatSocket?.emit("get-chat", { chatId: id });
		},
		[chatSocket]
	);

	return { selectChat };
};
