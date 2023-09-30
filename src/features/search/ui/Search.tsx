import React, { ChangeEvent, useState } from "react";

import { baseApi } from "@/shared/api";
import { useDebounce } from "@/shared/lib/hooks";
import { Field, Icon } from "@/shared/ui";

import { ISearchProps } from "./Search.interface";

import styles from "./Search.module.scss";

const Search: React.FC<ISearchProps> = ({ children }) => {
	const [accountName, setAccountName] = useState("");
	const accountNameDebounced = useDebounce(accountName, 500);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setAccountName(e.target.value);
	};

	const response = baseApi.useSearchUsersByAccountNameQuery(accountNameDebounced, {
		skip: !accountNameDebounced
	});

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
