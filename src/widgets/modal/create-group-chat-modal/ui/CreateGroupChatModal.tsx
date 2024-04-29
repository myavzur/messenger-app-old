import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { SelectUsersField } from "@/features/user/select-users-field/ui";
import { ISelectUserOption } from "@/features/user/select-users-field/ui";

import { Modal, ModalHeader } from "@/entities/modal/ui";

import { baseApi } from "@/shared/api";
import { ICreateGroupChatParams } from "@/shared/interfaces/socket.io";
import { useSocketsContext } from "@/shared/lib/hooks";
import { Button, ButtonGroup, Field, FieldLegend } from "@/shared/ui";

import { ICreateGroupChatModalProps } from "./CreateGroupChatModal.interface";

import styles from "./CreateGroupChatModal.module.scss";

export const CreateGroupChatModal: React.FC<ICreateGroupChatModalProps> = ({
	onClose
}) => {
	const { chatSocket } = useSocketsContext();
	const {
		data: users,
		isLoading: isUsersLoading,
		isFetching: isUsersFetching
	} = baseApi.useGetUsersBasedOnLocalChatsQuery();

	const [participants, setParticipants] = useState<ISelectUserOption[]>([]);
	const [isCreationLoading, setCreationLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { isValid, errors }
	} = useForm<ICreateGroupChatParams>({ mode: "onChange" });

	const userOptions = users?.map(user => {
		return {
			label: user.account_name,
			value: user.id
		} as ISelectUserOption;
	});

	const titleError = errors.title;

	const handleCreateGroupChat: SubmitHandler<ICreateGroupChatParams> = data => {
		if (!isValid) return;

		setCreationLoading(true);
		chatSocket?.emit(
			"create-group-chat",
			{
				participantsIds: participants.map(participant => participant.value),
				title: data.title
			},
			() => {
				console.log(
					"%c[CreateGroupChatModal/handleCreateGroupChat]: Success.",
					"color: green"
				);
				setCreationLoading(false);
				onClose();
			}
		);
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
						disabled={isCreationLoading}
					>
						{isCreationLoading ? "Creating..." : "Create"}
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
