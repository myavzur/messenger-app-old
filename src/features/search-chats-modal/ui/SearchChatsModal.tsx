import React from "react";

import { Search } from "@/features/search";

import { Modal, ModalHeader } from "@/entities/modal";

import { ISearchChatsModalProps } from "./SearchChatsModal.interface";

export const SearchChatsModal: React.FC<ISearchChatsModalProps> = ({ onClose }) => {
	return (
		<Modal
			onClose={onClose}
			headerElement={
				<ModalHeader onClose={onClose}>Find Serenity in Conversations</ModalHeader>
			}
		>
			<Search />
		</Modal>
	);
};
