import React, { ChangeEvent } from "react";

import { useSearchUsers } from "@/entities/user";

import { Field, Icon } from "@/shared/ui";

import { ISearchProps } from "./Search.interface";

import styles from "./Search.module.scss";

const Search: React.FC<ISearchProps> = ({ children }) => {
	const { accountName, setAccountName, accountNameDebounced, response } =
		useSearchUsers();

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setAccountName(e.target.value);
	};

	return (
		<>
			<Field
				className={styles.search}
				value={accountName}
				onChange={handleSearch}
				placeholder="Enter account name or chat name..."
			>
				<Icon
					name="search-eye"
					className={styles.search__icon}
				/>
			</Field>

			{children?.(response, accountNameDebounced)}
		</>
	);
};

export default Search;
