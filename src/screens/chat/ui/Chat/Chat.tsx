import cn from "classnames";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { ChatHeader } from "@/widgets/chat/chat-header/ui";
import { MessageList } from "@/widgets/chat/message-list/ui";

import { MessageForm } from "@/features/chat/message-form/ui";

import { ChatType, IChat } from "@/entities/chat/interfaces";

import {
	useAuth,
	useSockets,
	useStoreDispatch,
	useStoreSelector
} from "@/shared/lib/hooks";
import { chatActions } from "@/shared/models/chats";
import { PageLoader } from "@/shared/ui";

import styles from "./Chat.module.scss";

const Chat: React.FC = () => {
	const dispatch = useStoreDispatch();

	const params = useParams<{ polymorphicId: string }>();

	const { currentUser } = useAuth();
	const { chatSocket } = useSockets();
	const currentChat = useStoreSelector(state => state.chats.currentChat.data);

	/** Works along with `requestChat`.
	 * Request Chat Messages for passed `chat`.
	 * If `chat` is temporary - this means it hasn't any messages yet. */
	const requestChatHistory = (chat: IChat) => {
		if (chat.type === ChatType.TEMP) return;

		chatSocket?.emit(
			"get-chat-history",
			{
				chatId: chat.id,
				page: 1,
				limit: 100
			},
			data => {
				dispatch(
					chatActions.updateChatCarefully({
						chatId: data.chat_id,
						newData: {
							messages: data.messages
						}
					})
				);
			}
		);
	};

	/** Request Chat by it's `chatId`, after that request it's Messages by calling `requestChatHistory`. */
	const requestChat = (chatId: IChat["id"]) => {
		if (!chatSocket?.connected) return;

		chatSocket.emit("get-chat", { polymorphicId: chatId }, data => {
			dispatch(chatActions.setCurrentChat(data));
			requestChatHistory(data);
		});
	};

	useEffect(() => {
		// Clear currentChat on page mount or new params.
		dispatch(chatActions.clearCurrentChat());

		if (!params.polymorphicId) throw new Error("No param for /chat/:polymorphicId");

		requestChat(params.polymorphicId);

		/* We don't need really need `requestChat` in dependencies.
		 * But if we're adding it to them - we need to wrap `requestChat` in `useCallback`.
		 * This makes nonsense to me. */
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params, chatSocket]);

	if (!currentChat || !currentUser) {
		return (
			<div className={cn(styles.page, styles.page_loading)}>
				<div className={styles.page__background}></div>
				<PageLoader />
			</div>
		);
	}

	return (
		<div className={styles.page}>
			<div className={styles.page__background}></div>

			<ChatHeader
				className={styles.page__header}
				chat={currentChat}
			/>

			<MessageList
				chat={currentChat}
				currentUserId={currentUser.id}
				className={styles.page__messages}
			/>

			<MessageForm className={styles.page__form} />
		</div>
	);
};

export default Chat;
