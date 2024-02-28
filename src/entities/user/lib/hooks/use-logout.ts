import { useAuth } from ".";
import { useCallback } from "react";

import { removeAccessToken } from "@/shared/lib/helpers";
import { useSocketsContext, useStoreDispatch } from "@/shared/lib/hooks";
import { chatActions } from "@/shared/models/chats";

export const useLogout = () => {
	const dispatch = useStoreDispatch();

	const { disconnectAll } = useSocketsContext();
	const { refetchCurrentUser } = useAuth();

	const logout = useCallback(() => {
		removeAccessToken();
		disconnectAll();
		refetchCurrentUser();
		dispatch(chatActions.clearChats());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [disconnectAll]);

	return logout;
};
