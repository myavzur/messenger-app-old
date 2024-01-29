import React from "react";

import { IUser } from "@/entities/user/interfaces";

import { baseApi } from "@/shared/api";

export interface ISearchProps {
	children?: (
		result: ReturnType<typeof baseApi.useSearchUsersByAccountNameQuery>,
		accountNameDebounced: IUser["account_name"]
	) => React.ReactNode;
}
