import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useSockets } from "@/shared/lib/hooks/useSockets.ts";
import { useStoreSelector } from "@/shared/lib/hooks/useStoreSelector.ts";
import { Field } from "@/shared/ui";

import { ISendMessageFormProps } from "./SendMessageForm.interface.ts";

export const SendMessageForm: React.FC<ISendMessageFormProps> = ({ className }) => {
	const { activeChat } = useStoreSelector(state => state.chats);
	const { chatSocket } = useSockets();

	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid }
	} = useForm<{ text: string }>({ mode: "onChange" });

	const handleSendMessage: SubmitHandler<{ text: string }> = message => {
		if (!chatSocket?.connected || !isValid || !activeChat) return;

		chatSocket?.emit("send-message", {
			chatId: activeChat.id,
			userId: activeChat.users[0].id,
			text: message.text
		});

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
