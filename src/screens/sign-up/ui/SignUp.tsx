import React from "react";
import { useNavigate } from "react-router-dom";

import { SignUpForm } from "@/features/user/sign-up-form/ui";

import { ISignUpBody } from "@/entities/user/interfaces";

import { baseApi } from "@/shared/api";
import { useSocketsContext } from "@/shared/lib/hooks";

const SignUp: React.FC = () => {
	const navigate = useNavigate();

	const [signUp, status] = baseApi.useSignUpMutation();
	const { updateSocketsAccessToken } = useSocketsContext();

	const handleSignUp = (credentials: ISignUpBody) => {
		signUp(credentials)
			.unwrap()
			.then(data => {
				updateSocketsAccessToken(data.access_token);
				navigate("/chats");
			});
	};

	return (
		<SignUpForm
			onSubmit={handleSignUp}
			isSubmitting={status.isLoading}
		/>
	);
};

export default SignUp;
