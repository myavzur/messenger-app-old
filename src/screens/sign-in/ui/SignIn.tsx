import React from "react";
import { useNavigate } from "react-router-dom";

import { SignInForm } from "@/features/user/sign-in-form/ui";

import { ISignInBody } from "@/entities/user/interfaces";

import { baseApi } from "@/shared/api";
import { useSocketsContext } from "@/shared/lib/hooks";

const SignIn: React.FC = () => {
	const navigate = useNavigate();

	const [signIn, status] = baseApi.useSignInMutation();
	const { updateSocketsAccessToken } = useSocketsContext();

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
			isSubmitting={status.isLoading}
		/>
	);
};

export default SignIn;
