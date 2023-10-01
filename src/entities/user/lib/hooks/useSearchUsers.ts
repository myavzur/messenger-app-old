import { useState } from "react";

import { baseApi } from "@/shared/api";
import { useDebounce } from "@/shared/lib/hooks";

export const useSearchUsers = () => {
	const [accountName, setAccountName] = useState("");
	const accountNameDebounced = useDebounce(accountName, 500);

	const response = baseApi.useSearchUsersByAccountNameQuery(accountNameDebounced, {
		skip: !accountNameDebounced
	});

	return { accountNameDebounced, response, accountName, setAccountName };
};
