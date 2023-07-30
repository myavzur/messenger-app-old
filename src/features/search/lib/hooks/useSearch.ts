import { ChangeEvent, useState } from "react";

import { baseApi } from "@/shared/api";
import { useDebounce } from "@/shared/lib/hooks";

export const useSearch = (delayBeforeRequest: number) => {
	const [accountName, setAccountName] = useState("");
	const accountNameDebounced = useDebounce(accountName, delayBeforeRequest);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setAccountName(e.target.value);
	};

	const response = baseApi.useSearchUsersByAccountNameQuery(accountNameDebounced, {
		skip: !accountNameDebounced
	});

	return { handleSearch, accountName, accountNameDebounced, response };
};
