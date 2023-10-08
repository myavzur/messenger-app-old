import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Modal, ModalHeader } from "@/entities/modal";

import { baseApi } from "@/shared/api";
import { ICreateGroupChatBody } from "@/shared/interfaces/chat.interface";
import { useSockets } from "@/shared/lib/hooks";
import { Button, ButtonGroup, Field, FieldLegend } from "@/shared/ui";
import { IOption, MultipleSelectField } from "@/shared/ui/MultipleSelectField";

import { ICreateGroupChatModalProps } from "./CreateGroupChatModal.interface";

import styles from "./CreateGroupChatModal.module.scss";

export const CreateGroupChatModal: React.FC<ICreateGroupChatModalProps> = ({
	onClose
}) => {
	const { chatSocket } = useSockets();
	const { data: users, isLoading: isUsersLoading } =
		baseApi.useGetUsersBasedOnLocalChatsQuery();
	const [createGroupChat, status] = baseApi.useCreateGroupChatMutation();

	const [selectedUsers, setSelectedUsers] = useState<IOption[]>([]);

	const {
		register,
		handleSubmit,
		formState: { isValid, errors }
	} = useForm<ICreateGroupChatBody>({ mode: "onChange" });

	const options = users?.map(user => {
		return {
			label: user.account_name,
			value: String(user.id),
			image_url: user.avatar_url
		} as IOption;
	});

	const titleError = errors.title;

	const handleCreateGroupChat: SubmitHandler<ICreateGroupChatBody> = data => {
		if (!isValid) return;
		createGroupChat({
			...data,
			userIds: selectedUsers.map(user => Number(user.value))
		})
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

	console.log(selectedUsers);

	return (
		<Modal
			onClose={onClose}
			headerElement={<ModalHeader onClose={onClose}>Chat</ModalHeader>}
			footerElement={
				<ButtonGroup>
					<Button
						onClick={onClose}
						disabled={status.isLoading}
					>
						Cancel
					</Button>
					<Button
						form="chat-form"
						type="submit"
						disabled={status.isLoading}
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
						isLoadingOptions={isUsersLoading}
						options={options}
						onUpdate={setSelectedUsers}
					/>
				</FieldLegend>
			</form>
		</Modal>
	);
};
