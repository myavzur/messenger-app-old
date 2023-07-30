import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Chats from "@/screens/chats";
import SignIn from "@/screens/sign-in";
import SignUp from "@/screens/sign-up";

import { useAuth } from "@/shared/lib/hooks";
import { ProtectedRoute } from "@/shared/lib/utils";
import { PageLoader } from "@/shared/ui";

const redirectPath = "/sign-in";

const AppRouter: React.FC = () => {
	const { isAuthorized, isCurrentUserLoading } = useAuth();

	if (isCurrentUserLoading) {
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
							hasAccess={isAuthorized}
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
