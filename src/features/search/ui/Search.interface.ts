import React from "react";

import { baseApi } from "@/shared/api";
import { IUser } from "@/shared/interfaces/user.interface";

export interface ISearchProps {
	children?: (
		result: ReturnType<typeof baseApi.useSearchUsersByAccountNameQuery>,
		accountNameDebounced: IUser["account_name"]
	) => React.ReactNode;
}
