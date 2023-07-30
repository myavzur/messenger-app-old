import { baseApi } from "@/shared/api";

export const useAuth = () => {
	const {
		data: currentUser,
		isError: isCurrentUserError,
		isLoading: isCurrentUserLoading,
		refetch: refetchCurrentUser
	} = baseApi.useGetCurrentUserQuery();

	const isAuthorized = Boolean(currentUser && !isCurrentUserError);

	return {
		isAuthorized,
		currentUser,
		isCurrentUserError,
		isCurrentUserLoading,
		refetchCurrentUser
	};
};
