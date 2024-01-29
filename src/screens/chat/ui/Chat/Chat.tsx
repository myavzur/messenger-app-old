import cn from "classnames";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { ChatHeader } from "@/widgets/chat/chat-header/ui";
import { MessageList } from "@/widgets/chat/message-list/ui";

import { MessageForm } from "@/features/chat/message-form/ui";

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

	useEffect(() => {
		dispatch(chatActions.clearCurrentChat());

		if (!params.polymorphicId) throw new Error("No param for /chat/:polymorphicId");
		if (!chatSocket?.connected) return;

		chatSocket.emit("get-chat", {
			polymorphicId: params.polymorphicId
		});

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
