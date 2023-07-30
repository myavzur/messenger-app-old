import { LoginOutlined } from "@ant-design/icons";
import { Box, Button, Center, Stack, rem } from "@mantine/core";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { AuthLayout } from "@/layouts";

import { baseApi } from "@/shared/api";
import { ISignInBody } from "@/shared/interfaces/user.interface";
import { useSockets } from "@/shared/lib/hooks";
import {
	Field,
	FieldLegend,
	Logo,
	PasswordField,
	TextAnchor,
	Title
} from "@/shared/ui";

const SignIn: React.FC = () => {
	const navigate = useNavigate();

	const [signIn, signInStatus] = baseApi.useSignInMutation();
	const { updateSocketsAccessToken } = useSockets();

	const {
		register,
		handleSubmit,
		formState: { isValid }
	} = useForm<ISignInBody>({ mode: "onChange" });

	const handleSignIn: SubmitHandler<ISignInBody> = credentials => {
		if (isValid) {
			signIn(credentials)
				.unwrap()
				.then(data => {
					updateSocketsAccessToken(data.access_token);
					navigate("/");
				});
		}
	};

	return (
		<AuthLayout>
			<Box
				maw={rem(360)}
				w="100%"
			>
				<form onSubmit={handleSubmit(handleSignIn)}>
					<Stack>
						<Box mb="md">
							<Center>
								<Logo />
								<span className={"pl-2"}>
									<Title> Messenger </Title>
								</span>
							</Center>
						</Box>

						<FieldLegend legend="Email">
							<Field
								required={true}
								type="email"
								{...register("email")}
							/>
						</FieldLegend>

						<FieldLegend legend="Password">
							<PasswordField
								required={true}
								{...register("password")}
							/>
						</FieldLegend>
					</Stack>

					<Stack
						mt="xl"
						align="center"
					>
						<p>Forgot your password?</p>

						<Button
							type="submit"
							leftIcon={<LoginOutlined size={20} />}
							color="red"
							variant="outline"
							loading={signInStatus.isLoading}
						>
							Sign In
						</Button>

						<span>
							Don't have an account? <TextAnchor to="/sign-up">Sign Up</TextAnchor>
						</span>
					</Stack>
				</form>
			</Box>
		</AuthLayout>
	);
};

export default SignIn;
