import { VideoCameraAddOutlined } from "@ant-design/icons";
import cn from "classnames";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useTemporaryChat } from "@/entities/chat/lib/hooks/useTemporaryChat";
import ChatMessage from "@/entities/chat/ui/ChatMessage";
import { UserInfo } from "@/entities/user";

import { useAuth, useScrollButton, useSockets, useStoreSelector } from "@/shared/lib/hooks";
import { Field } from "@/shared/ui";

import ChatHeader from "../ChatHeader";

import styles from "./ChatActive.module.scss";

const ChatActive: React.FC = () => {
	const { activeChat } = useStoreSelector(state => state.chats);
	const { currentUser } = useAuth();
	const { chatSocket } = useSockets();
	const { sendMessageAndCreateChat } = useTemporaryChat();
	const { windowRef, isFocusingWindow, scrollWindow } = useScrollButton({
		appearsAfterScrolledPixels: 1000
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid }
	} = useForm<{ text: string }>({ mode: "onChange" });

	/* If active chat exists - send message to it.
	 * Overwise - create it and send message to it
	 */
	const handleSendMessage: SubmitHandler<{ text: string }> = message => {
		if (!isValid || !activeChat) return;

		if (activeChat.id) {
			chatSocket?.emit("send-message", {
				chatId: activeChat.id,
				text: message.text
			});
		} else {
			sendMessageAndCreateChat(activeChat.users[0].id, message.text);
		}

		reset();
	};

	// Scroll messages to bottom on initialize and on new message.
	useEffect(() => {
		if (!isFocusingWindow) {
			scrollWindow('smooth');
		}
	}, [activeChat?.messages])


	if (!activeChat || !currentUser)
		return (
			<div className={styles["active-chat"]}>
				<div className={styles["active-chat__background-filter"]} />
			</div>
		);

	const user = activeChat.users.find(
		participant => participant.id !== currentUser.id
	);

	return (
		<div className={styles["active-chat"]}>
			<div className={styles["active-chat__background-filter"]} />

			<ChatHeader className={styles["active-chat__header"]}>
				{user && <UserInfo user={user} />}

				<div className={styles["active-chat__actions"]}>
					<VideoCameraAddOutlined />
				</div>
			</ChatHeader>

			<div
				ref={windowRef}
				className={styles["active-chat__messages"]}
			>
				{activeChat?.messages &&
					activeChat.messages.map(message => {
						const isOwn = currentUser.id === message.user.id;

						return (
							<ChatMessage
								key={message.id}
								className={cn(styles["active-chat__messages-message"], {
									[styles["active-chat__messages-message_own"]]: isOwn
								})}
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
					className={styles["active-chat__form-field"]}
					placeholder="Message"
					{...register("text", {
						minLength: 1,
						required: true
					})}
				/>
			</form>
		</div>
	);
};

export default ChatActive;
