import React, { Suspense } from "react";
import {
	BrowserRouter,
	Navigate,
	NavigateFunction,
	Route,
	Routes,
	useNavigate
} from "react-router-dom";

import { AuthLayout } from "@/layouts/auth-layout/ui";
import { ChatsLayout } from "@/layouts/chats-layout/ui";

import { useAuth } from "@/entities/user/lib/hooks";

import { PageLoader } from "@/shared/ui";

const Chats = React.lazy(() => import("@/screens/chats"));
const Chat = React.lazy(() => import("@/screens/chat"));
const SignIn = React.lazy(() => import("@/screens/sign-in"));
const SignUp = React.lazy(() => import("@/screens/sign-up"));

export const History: {
	navigate: (path: string) => void | NavigateFunction;
} = {
	navigate: () => {
		return;
	}
};

const NavigateSetter = () => {
	History.navigate = useNavigate();
	return null;
};

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
	const { isAuthorized, isCurrentUserFetching } = useAuth();

	if (isCurrentUserFetching) {
		return <PageLoader isFullScreen={true} />;
	}

	return (
		<BrowserRouter>
			<NavigateSetter />

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
							path=":polymorphicId"
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

					<Route
						index
						element={<Navigate to="/chats" />}
					/>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default AppRouter;
