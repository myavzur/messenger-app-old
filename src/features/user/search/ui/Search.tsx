import React, { ChangeEvent } from "react";

import { useSearchUsers } from "@/entities/user/lib/hooks";

import { Field, FieldAction, Icon } from "@/shared/ui";

import { ISearchProps } from "./Search.interface";

export const Search: React.FC<ISearchProps> = ({ children }) => {
	const { accountName, setAccountName, accountNameDebounced, response } =
		useSearchUsers();

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setAccountName(e.target.value);
	};

	return (
		<>
			<Field
				value={accountName}
				onChange={handleSearch}
				placeholder="Enter account name or chat name..."
			>
				<FieldAction
					iconElement={<Icon name="search-eye" />}
					onClick={() => alert("Search")}
				/>
			</Field>

			{children?.(response, accountNameDebounced)}
		</>
	);
};
