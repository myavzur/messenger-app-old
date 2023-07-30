import React from "react";

import { useTemporaryChat } from "@/entities/chat/lib/hooks/useTemporaryChat";

import { useStoreDispatch } from "@/shared/lib/hooks";
import { Field } from "@/shared/ui";

import { useSearch } from "../lib/hooks";

import { SearchProps } from "./Search.interface";

import styles from "./Search.module.scss";

const Search: React.FC<SearchProps> = ({}) => {
	const dispatch = useStoreDispatch();
	const {
		handleSearch,
		response: { data: users, isLoading, isSuccess },
		accountName,
		accountNameDebounced
	} = useSearch(500);
	const { openTemporaryChat } = useTemporaryChat();

	let resultElement: React.ReactNode | null = null;

	if (isLoading) {
		resultElement = <div>Loading...</div>;
	}

	if (isSuccess && users?.length) {
		resultElement = users.map(user => (
			<div
				key={user.id}
				onClick={() => openTemporaryChat(user)}
			>
				{user.account_name}
			</div>
		));
	}

	if (isSuccess && users?.length === 0) {
		resultElement = <div>Users with {accountNameDebounced} account not found.</div>;
	}

	return (
		<div className={styles.search}>
			<Field
				value={accountName}
				onChange={handleSearch}
			/>
			<div>{resultElement}</div>
		</div>
	);
};

export default Search;
