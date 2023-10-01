import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Modal, ModalHeader } from "@/entities/modal";

import { baseApi } from "@/shared/api";
import { ICreateGroupChatBody } from "@/shared/interfaces/chat.interface";
import { useSockets } from "@/shared/lib/hooks";
import {
	Button,
	ButtonGroup,
	Field,
	FieldLegend,
	MultipleSelectField
} from "@/shared/ui";

import { ICreateGroupChatModalProps } from "./CreateGroupChatModal.interface";

import styles from "./CreateGroupChatModal.module.scss";

export const CreateGroupChatModal: React.FC<ICreateGroupChatModalProps> = ({
	onClose
}) => {
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
			.then(() => {
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
			headerElement={<ModalHeader onClose={onClose}>New group chat</ModalHeader>}
			footerElement={
				<ButtonGroup>
					<Button onClick={onClose}>Cancel</Button>
					<Button
						form="chat-form"
						type="submit"
					>
						Create
					</Button>
				</ButtonGroup>
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
						placeholder="Title"
						{...register("title", {
							maxLength: {
								value: 128,
								message: "Title is too long. Over 128 symbols."
							}
						})}
					/>
				</FieldLegend>

				<FieldLegend
					legend="Members"
					description="You can invite only those people with whom you spoke earlier."
				>
					<MultipleSelectField
						options={[
							{ value: "richthegxd", label: "richthegxd" },
							{ value: "aly", label: "aly" }
						]}
						selectedOptions={[{ value: "myavzur", label: "myavzur" }]}
					/>
				</FieldLegend>
			</form>
		</Modal>
	);
};
