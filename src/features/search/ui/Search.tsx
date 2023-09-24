import React from "react";
import { useNavigate } from "react-router-dom";

import { Field, Icon } from "@/shared/ui";

import { useSearch } from "../lib/hooks";

import styles from "./Search.module.scss";

const Search: React.FC = () => {
	const navigate = useNavigate();

	const {
		handleSearch,
		response: { data: users, isLoading, isSuccess },
		accountName,
		accountNameDebounced
	} = useSearch(500);

	let resultElement: React.ReactNode | null = null;

	if (isLoading) {
		resultElement = <div>Loading...</div>;
	}

	if (isSuccess && users?.length) {
		resultElement = users.map(user => (
			<div
				key={user.id}
				onClick={() => navigate(`/chats/${user.id}`)}
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
				placeholder="Enter account name or chat name..."
			>
				<Icon
					name="search-eye"
					className={styles.search__icon}
				/>
			</Field>
			<div>{resultElement}</div>
		</div>
	);
};

export default Search;
