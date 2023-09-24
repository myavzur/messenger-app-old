import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { MessagesList } from "@/widgets/messages-list";

import { SendMessageForm } from "@/features/send-message-form";

import { useAuth, useSockets, useStoreSelector } from "@/shared/lib/hooks";
import { PageLoader } from "@/shared/ui";

import { Header } from "../Header/Header";

import styles from "./Chat.module.scss";

const Chat: React.FC = () => {
	const params = useParams<{ chatOrUserId: string }>();

	const { chatSocket } = useSockets();
	const { activeChat } = useStoreSelector(state => state.chats);
	const { currentUser } = useAuth();

	useEffect(() => {
		if (!params.chatOrUserId) throw new Error("No params for /chat/:id specified");

		chatSocket?.emit("get-chat", {
			chatId: Number(params.chatOrUserId),
			userId: Number(params.chatOrUserId)
		});
	}, [chatSocket, params]);

	if (!activeChat) return <PageLoader />;

	return (
		<div className={styles.page}>
			<div className={styles["page__background"]} />

			<Header
				className={styles.page__header}
				chat={activeChat}
			/>

			<MessagesList
				className={styles.page__messages}
				messages={activeChat.messages}
				userId={currentUser!.id}
			/>

			<SendMessageForm className={styles.page__form} />
		</div>
	);
};

export default Chat;
