import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

interface IAppOAuthProps {
	children?: React.ReactNode;
}

const AppOAuth: React.FC<IAppOAuthProps> = ({ children }) => {
	return (
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
			{children}
		</GoogleOAuthProvider>
	);
};

export default AppOAuth;
