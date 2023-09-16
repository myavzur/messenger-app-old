import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useTemporaryChat } from "@/entities/chat/lib/hooks/useTemporaryChat.ts";

import { useSockets } from "@/shared/lib/hooks/useSockets.ts";
import { useStoreSelector } from "@/shared/lib/hooks/useStoreSelector.ts";
import { Field } from "@/shared/ui";

import { ISendMessageFormProps } from "./SendMessageForm.interface.ts";

export const SendMessageForm: React.FC<ISendMessageFormProps> = ({ className }) => {
	const { activeChat } = useStoreSelector(state => state.chats);
	const { chatSocket } = useSockets();
	const { sendMessageAndCreateChat } = useTemporaryChat();

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

	return (
		<form
			className={className}
			onSubmit={handleSubmit(handleSendMessage)}
		>
			<Field
				placeholder="Message"
				{...register("text", {
					minLength: 1,
					required: true
				})}
			/>
		</form>
	);
};
