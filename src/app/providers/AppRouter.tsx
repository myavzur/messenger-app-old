import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthLayout, ChatsLayout } from "@/layouts";

import { useAuth } from "@/shared/lib/hooks";
import { PageLoader } from "@/shared/ui";

const Chats = React.lazy(() => import("@/screens/chats"));
const Chat = React.lazy(() => import("@/screens/chat"));
const SignIn = React.lazy(() => import("@/screens/sign-in"));
const SignUp = React.lazy(() => import("@/screens/sign-up"));

const ProtectedRoute: React.FC<{
	redirectPath: string;
	hasAccess: boolean;
	outlet: JSX.Element;
}> = ({ hasAccess, outlet, redirectPath }) => {
	return hasAccess ? outlet : <Navigate to={redirectPath} />;
};

/** Uses PageLoader for 2 cases.
 * * Fetching user data from server
 * * Loading lazy page
 */
const AppRouter: React.FC = () => {
	const { isAuthorized, isCurrentUserLoading } = useAuth();

	if (isCurrentUserLoading) {
		return <PageLoader />;
	}

	return (
		<BrowserRouter>
			<Suspense fallback={<PageLoader />}>
				<Routes>
					<Route
						path="/chats"
						element={
							<ProtectedRoute
								redirectPath="/auth/sign-in"
								hasAccess={isAuthorized}
								outlet={<ChatsLayout />}
							/>
						}
					>
						<Route
							index
							element={<Chats />}
						/>
						<Route
							path=":id"
							element={<Chat />}
						/>
					</Route>

					<Route
						path="/auth"
						element={<AuthLayout />}
					>
						<Route
							path="sign-in"
							element={<SignIn />}
						/>
						<Route
							path="sign-up"
							element={<SignUp />}
						/>
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default AppRouter;
