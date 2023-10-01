import React from "react";
import { useNavigate } from "react-router-dom";

import { Search } from "@/features/search";

import { Modal, ModalHeader } from "@/entities/modal";
import { UserCard } from "@/entities/user";

import { IUser } from "@/shared/interfaces/user.interface";
import { Button, ButtonGroup } from "@/shared/ui";

import { ISearchChatsModalProps } from "./SearchChatsModal.interface";

import styles from "./SearchChatsModal.module.scss";

export const SearchChatsModal: React.FC<ISearchChatsModalProps> = ({ onClose }) => {
	const navigate = useNavigate();

	return (
		<Modal
			onClose={onClose}
			headerElement={<ModalHeader onClose={onClose}>New local chat</ModalHeader>}
			footerElement={
				<ButtonGroup>
					<Button onClick={onClose}>Close</Button>
				</ButtonGroup>
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
										<UserCard
											key={user.id}
											user={user}
											onClick={() => navigate(`/chats/${user.id}`)}
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
