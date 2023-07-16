import React, { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Chats from "@/screens/chats";
import SignIn from "@/screens/sign-in";
import SignUp from "@/screens/sign-up";

import { baseApi } from "@/shared/api";
import { ProtectedRoute } from "@/shared/lib/utils";
import { PageLoader } from "@/shared/ui";

const redirectPath = "/sign-in";

const AppRouter: React.FC = () => {
	// TODO: Refactor since it's causes warnings in console.
	const {
		data: user,
		isError: isUserError,
		isLoading: isUserLoading
	} = baseApi.useGetCurrentUserQuery();

	const hasAccess = useMemo(
		() => Boolean(user && !isUserError),
		[user, isUserError]
	);

	if (isUserLoading) {
		return <PageLoader />;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route
					index
					element={
						<ProtectedRoute
							redirectPath={redirectPath}
							hasAccess={hasAccess}
							outlet={<Chats />}
						/>
					}
				/>
				<Route
					path="/sign-in"
					element={<SignIn />}
				/>
				<Route
					path="/sign-up"
					element={<SignUp />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
