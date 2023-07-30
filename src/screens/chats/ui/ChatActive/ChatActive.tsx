import { VideoCameraAddOutlined } from "@ant-design/icons";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useTemporaryChat } from "@/entities/chat/lib/hooks/useTemporaryChat";
import ChatMessage from "@/entities/chat/ui/ChatMessage";
import { UserInfo } from "@/entities/user";

import { useAuth, useSockets, useStoreSelector } from "@/shared/lib/hooks";
import { Field } from "@/shared/ui";

import ChatHeader from "../ChatHeader";

import styles from "./ChatActive.module.scss";
import cn from "classnames";

const ChatActive: React.FC = () => {
	const { activeChat } = useStoreSelector(state => state.chats);
	const { currentUser } = useAuth();
	const { chatSocket } = useSockets();
	const { sendMessageAndCreateChat } = useTemporaryChat();

	const {
		register,
		handleSubmit,
		formState: { isValid }
	} = useForm<{ text: string }>({ mode: "onChange" });

	const handleSendMessage: SubmitHandler<{ text: string }> = message => {
		if (!isValid || !activeChat) return;

		/* If active chat exists - send message to it.
		 * Overwise - create it and send message to it
		 */
		if (activeChat.id) {
			chatSocket?.emit("send-message", {
				chatId: activeChat.id,
				text: message.text
			});
		} else {
			sendMessageAndCreateChat(activeChat.users[0].id, message.text);
		}
	};

	// TODO: Make nice background for empty chat.
	if (!activeChat || !currentUser) return (
		<div className={styles["active-chat"]}>
			<div className={styles["active-chat__background-filter"]} />
		</div>
	);

	return (
		<div className={styles["active-chat"]}>
			<div className={styles["active-chat__background-filter"]} />

			<ChatHeader className={styles["active-chat__header"]}>
				<UserInfo
					user={activeChat.users.find(
						participant => participant.id !== currentUser.id
					)}
				/>

				<div className={styles["active-chat__actions"]}>
					<VideoCameraAddOutlined />
				</div>
			</ChatHeader>

			<div className={styles["active-chat__messages"]}>
				{activeChat?.messages &&
					activeChat.messages.map(message => {
						const isOwn = currentUser.id === message.user.id;

						return (
							<ChatMessage
								key={message.id}
								className={cn(
									styles["active-chat__messages-message"],
									{ [styles["active-chat__messages-message_own"]]: isOwn }
								)}
								isOwn={isOwn}
								message={message}
							/>
						);
					})}
			</div>

			<form
				className={styles["active-chat__form"]}
				onSubmit={handleSubmit(handleSendMessage)}
			>
				<Field
					{...register("text")}
					className={styles["active-chat__form-field"]}
					placeholder="Message"
				/>

				<button
					className={styles["active-chat__form-submit"]}
					type="submit"
				>
					💗
				</button>
			</form>
		</div>
	);
};

export default ChatActive;
