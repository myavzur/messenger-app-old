import React from "react";
import { useNavigate } from "react-router-dom";

import { SignUpForm } from "@/features/sign-up-form";

import { baseApi } from "@/shared/api";
import { ISignUpBody } from "@/shared/interfaces/user.interface";
import { useSockets } from "@/shared/lib/hooks";

const SignUp: React.FC = () => {
	const navigate = useNavigate();

	const [signUp, signUpStatus] = baseApi.useSignUpMutation();
	const { updateSocketsAccessToken } = useSockets();

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
			isSubmitting={signUpStatus.isLoading}
		/>
	);
};

export default SignUp;
