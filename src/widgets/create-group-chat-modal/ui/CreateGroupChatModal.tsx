import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Modal, ModalHeader } from "@/entities/modal";
import { UserCard } from "@/entities/user";

import { baseApi } from "@/shared/api";
import { ICreateGroupChatBody } from "@/shared/interfaces/chat.interface";
import { Button, Field, FieldLegend } from "@/shared/ui";

import { ICreateGroupChatModalProps } from "./CreateGroupChatModal.interface";

import styles from "./CreateGroupChatModal.module.scss";
import { useSockets } from "@/shared/lib/hooks";

export const CreateGroupChatModal: React.FC<ICreateGroupChatModalProps> = ({
	onClose
}) => {
	const navigate = useNavigate();

	const { chatSocket } = useSockets();
	const [createGroupChat, status] = baseApi.useCreateGroupChatMutation();

	const {
		register,
		handleSubmit,
		formState: { isValid, errors }
	} = useForm<ICreateGroupChatBody>({ mode: "onChange" });

	const titleError = errors.title;

	const handleCreateGroupChat: SubmitHandler<ICreateGroupChatBody> = data => {
		if (!isValid) return;
		createGroupChat({ ...data, userIds: Array.from(Array(1005).keys()) })
			.unwrap()
			.then(chat => {
				// navigate(`/chats/${chat.id}`);

				if (!chatSocket?.connected) return;
				chatSocket?.emit("get-chats", {
					page: 1,
					limit: 30
				});

				onClose();
			});
	};

	return (
		<Modal
			onClose={onClose}
			headerElement={
				<ModalHeader onClose={onClose}>Find Serenity in Communion</ModalHeader>
			}
			footerElement={
				<>
					<Button onClick={onClose}>Cancel</Button>
					<Button
						form="chat-form"
						type="submit"
					>
						Create
					</Button>
				</>
			}
		>
			<form
				className={styles.form}
				id="chat-form"
				onSubmit={handleSubmit(handleCreateGroupChat)}
			>
				<FieldLegend
					legend="Title"
					withAsterisk={true}
				>
					<Field
						required={true}
						isInvalid={Boolean(titleError)}
						{...register("title", {
							maxLength: {
								value: 128,
								message: "Title is too long. Over 128 symbols."
							}
						})}
					/>
				</FieldLegend>
			</form>
		</Modal>
	);
};
