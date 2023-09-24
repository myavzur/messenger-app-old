import React from "react";

import { Search } from "@/features/search";

import { Modal, ModalHeader } from "@/entities/modal";

import { ISearchChatsModalProps } from "./SearchChatsModal.interface";

import styles from "./SearchChatsModal.module.scss";

export const SearchChatsModal: React.FC<ISearchChatsModalProps> = ({ onClose }) => {
	return (
		<Modal
			onClose={onClose}
			headerElement={
				<ModalHeader onClose={onClose}>Find Serenity in Communion</ModalHeader>
			}
		>
			<div className={styles.modal}>
				<Search />
			</div>
		</Modal>
	);
};
