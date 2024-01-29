import React from "react";
import { useNavigate } from "react-router-dom";

import { Search } from "@/features/user/search/ui";

import { Modal, ModalHeader } from "@/entities/modal/ui";
import { IUser } from "@/entities/user/interfaces";
import { UserInfoBlock } from "@/entities/user/ui";

import { Button } from "@/shared/ui";

import { ISearchChatsModalProps } from "./SearchChatsModal.interface";

import styles from "./SearchChatsModal.module.scss";

export const SearchChatsModal: React.FC<ISearchChatsModalProps> = ({ onClose }) => {
	const navigate = useNavigate();

	const handleSelectUser = (user: IUser) => {
		navigate(`/chats/${user.id}`);
		onClose();
	};

	return (
		<Modal
			onClose={onClose}
			headerElement={<ModalHeader onClose={onClose}>Search For Chats</ModalHeader>}
			footerElement={
				<Button
					isFullWidth={true}
					onClick={onClose}
				>
					Close
				</Button>
			}
		>
			<div className={styles.modal}>
				<div className={styles.search}>
					<Search>
						{(result, accountNameDebounced) => {
							const { isLoading, isSuccess, data: users } = result;

							if (isLoading) {
								return (
									<div className={styles.search__result}>
										<p>Loading...</p>
									</div>
								);
							}

							if (isSuccess && users.length === 0) {
								return (
									<div className={styles.search__result}>
										<p>No result for `{accountNameDebounced}` was found</p>
									</div>
								);
							}

							if (!users || !accountNameDebounced) return null;

							return (
								<div className={styles.search__result}>
									{users.map((user: IUser) => (
										<UserInfoBlock
											key={user.id}
											user={user}
											onClick={() => handleSelectUser(user)}
										/>
									))}
								</div>
							);
						}}
					</Search>
				</div>
			</div>
		</Modal>
	);
};
