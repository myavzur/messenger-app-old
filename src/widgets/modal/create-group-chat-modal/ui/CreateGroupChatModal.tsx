import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { SelectUsersField } from "@/features/user/select-users-field/ui";
import { ISelectUserOption } from "@/features/user/select-users-field/ui";

import { ICreateGroupChatBody } from "@/entities/chat/interfaces";
import { Modal, ModalHeader } from "@/entities/modal/ui";

import { baseApi } from "@/shared/api";
import { useAuth, useSockets } from "@/shared/lib/hooks";
import { Button, ButtonGroup, Field, FieldLegend } from "@/shared/ui";

import { ICreateGroupChatModalProps } from "./CreateGroupChatModal.interface";

import styles from "./CreateGroupChatModal.module.scss";

export const CreateGroupChatModal: React.FC<ICreateGroupChatModalProps> = ({
	onClose
}) => {
	const { currentUser } = useAuth();
	const { chatSocket } = useSockets();
	const {
		data: users,
		isLoading: isUsersLoading,
		isFetching: isUsersFetching
	} = baseApi.useGetUsersBasedOnLocalChatsQuery();
	const [createGroupChat, status] = baseApi.useCreateGroupChatMutation();

	const [participants, setParticipants] = useState<ISelectUserOption[]>([]);

	const {
		register,
		handleSubmit,
		formState: { isValid, errors, touchedFields },
		setValue
	} = useForm<ICreateGroupChatBody>({ mode: "onChange" });

	const userOptions = users?.map(user => {
		return {
			label: user.account_name,
			value: user.id,
			image_url: user.avatar_url
		} as ISelectUserOption;
	});

	const titleError = errors.title;

	const handleCreateGroupChat: SubmitHandler<ICreateGroupChatBody> = data => {
		if (!isValid) return;
		createGroupChat({
			...data,
			participantsIds: participants.map(participant => participant.value)
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

	useEffect(() => {
		if (touchedFields.title || !currentUser?.account_name) return;

		setValue(
			"title",
			participants.reduce(
				(prev, curr) => `${prev}, ${curr.label}`,
				currentUser?.account_name
			)
		);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [participants]);

	return (
		<Modal
			onClose={onClose}
			headerElement={<ModalHeader onClose={onClose}>New Group Chat</ModalHeader>}
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
						{...register("title", {
							maxLength: {
								value: 128,
								message: "Title is too long. Over 128 symbols."
							}
						})}
					/>
				</FieldLegend>

				<FieldLegend
					legend="Participants"
					description="You can invite only those people with whom you spoke earlier."
					withAsterisk={true}
				>
					<SelectUsersField
						isFetching={isUsersFetching}
						isLoading={isUsersLoading}
						onChange={options => setParticipants(options)}
						onSearch={value => console.log("searching:", value)}
						options={userOptions}
						placeholder="Please, select users"
						renderOption={({ label }) => {
							return <h1>{label}</h1>;
						}}
					/>
				</FieldLegend>
			</form>
		</Modal>
	);
};
