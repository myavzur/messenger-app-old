import React, { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

import { MessagesList } from "@/widgets/messages-list";

import { SendMessageForm } from "@/features/send-message-form";

import { useAuth, useSockets, useStoreSelector } from "@/shared/lib/hooks";
import { PageLoader } from "@/shared/ui";

import { Header } from "../Header/Header";

import styles from "./Chat.module.scss";

const Chat: React.FC = () => {
	const params = useParams<{ id: string }>();

	const { chatSocket } = useSockets();
	const { activeChat } = useStoreSelector(state => state.chats);
	const { currentUser } = useAuth();

	useLayoutEffect(() => {
		if (!params.id) throw new Error("No params for /chat/:id specified");

		chatSocket?.emit("get-chat", {
			chatId: Number(params.id)
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

			{activeChat.messages?.length > 0 && (
				<MessagesList
					className={styles.page__messages}
					messages={activeChat.messages}
					userId={currentUser!.id}
				/>
			)}

			<SendMessageForm className={styles.page__form} />
		</div>
	);
};

export default Chat;
