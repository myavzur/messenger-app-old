import { baseApi } from "@/shared/api";

export const useAuth = () => {
	const {
		data: currentUser,
		isError: isCurrentUserError,
		isFetching: isCurrentUserFetching,
		isLoading: isCurrentUserLoading,
		isSuccess: isCurrentUserSuccess,
		refetch: refetchCurrentUser
	} = baseApi.useGetCurrentUserQuery();

	const isAuthorized = Boolean(currentUser && !isCurrentUserError);

	return {
		isAuthorized,
		currentUser,
		isCurrentUserError,
		isCurrentUserLoading,
		isCurrentUserSuccess,
		isCurrentUserFetching,
		refetchCurrentUser
	};
};
