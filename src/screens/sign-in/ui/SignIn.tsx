import React from "react";
import { useNavigate } from "react-router-dom";

import { SignInForm } from "@/features/sign-in-form";

import { baseApi } from "@/shared/api";
import { ISignInBody } from "@/shared/interfaces/user.interface";
import { useSockets } from "@/shared/lib/hooks";

const SignIn: React.FC = () => {
	const navigate = useNavigate();

	const [signIn, signInStatus] = baseApi.useSignInMutation();
	const { updateSocketsAccessToken } = useSockets();

	const handleSignIn = (credentials: ISignInBody) => {
		signIn(credentials)
			.unwrap()
			.then(data => {
				updateSocketsAccessToken(data.access_token);
				navigate("/chats");
			});
	};

	return (
		<SignInForm
			onSubmit={handleSignIn}
			isSubmitting={signInStatus.isLoading}
		/>
	);
};

export default SignIn;
