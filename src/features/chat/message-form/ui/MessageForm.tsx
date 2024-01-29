import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ChatMessageEmbedded } from "@/entities/chat/ui";

import {
	useAuth,
	useSockets,
	useStoreDispatch,
	useStoreSelector
} from "@/shared/lib/hooks";
import { chatActions } from "@/shared/models/chats/chats.slice.ts";
import { FieldAction, Icon, TextAreaField } from "@/shared/ui";

import { IMessageFormProps } from "./MessageForm.interface.ts";

import styles from "./MessageForm.module.scss";

export const MessageForm: React.FC<IMessageFormProps> = ({ className }) => {
	const dispatch = useStoreDispatch();
	const { currentUser } = useAuth();
	const { chatSocket } = useSockets();

	const currentChat = useStoreSelector(state => state.chats.currentChat.data);
	const embeddedMessage = useStoreSelector(
		state => state.chats.currentChat.embeddedMessage
	);

	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid }
	} = useForm<{ text: string }>({ mode: "onChange" });

	const clearEmbeddedMessage = () => {
		dispatch(chatActions.clearCurrentChatEmbeddedMessage());
	};

	const handleSendMessage: SubmitHandler<{ text: string }> = message => {
		if (!chatSocket?.connected || !isValid || !currentChat || !currentUser) return;

		reset();
		clearEmbeddedMessage();

		chatSocket?.emit("send-message", {
			chatId: currentChat.id,
			userId: currentChat.participants.find(
				participant => participant.user.id !== currentUser.id
			)?.user.id,
			text: message.text,
			replyForId: embeddedMessage?.id
		});

		reset();
	};

	return (
		<div className={className}>
			{embeddedMessage && (
				<div className={styles.embedded}>
					<Icon
						name="reply"
						className={styles.embedded__icon}
					/>

					<ChatMessageEmbedded
						className={styles.embedded__message}
						message={embeddedMessage}
						onClick={() => alert("Embeded!")}
					/>

					<Icon
						name="close"
						className={styles.embedded__close}
						onClick={clearEmbeddedMessage}
					/>
				</div>
			)}

			<form onSubmit={handleSubmit(handleSendMessage)}>
				<TextAreaField
					placeholder="Message"
					{...register("text", {
						minLength: 1,
						required: true
					})}
					maxGrowHeight={420}
					preventBorderTop={Boolean(embeddedMessage)}
				>
					<FieldAction
						iconElement={<Icon name="attach" />}
						onMouseOver={() => alert("Attach")}
					/>
				</TextAreaField>
			</form>
		</div>
	);
};
