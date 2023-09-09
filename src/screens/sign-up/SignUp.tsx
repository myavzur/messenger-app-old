import { UserAddOutlined } from "@ant-design/icons";
import { Box, Button, Center, Stack, rem } from "@mantine/core";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { AuthLayout } from "@/layouts";

import { baseApi } from "@/shared/api";
import { ISignUpBody } from "@/shared/interfaces/user.interface";
import { useSockets } from "@/shared/lib/hooks";
import { validateEmail } from "@/shared/lib/validators/email.validator";
import {
	Field,
	FieldLegend,
	Logo,
	PasswordField,
	TextAnchor,
	Title
} from "@/shared/ui";

const SignUp: React.FC = () => {
	const navigate = useNavigate();

	const [signUp, signUpStatus] = baseApi.useSignUpMutation();
	const { updateSocketsAccessToken } = useSockets();

	const {
		register,
		handleSubmit,
		formState: { isValid, errors },
		setError,
		clearErrors,
		getValues
	} = useForm<ISignUpBody>({ mode: "onChange" });

	const accountNameError = errors.account_name?.message;
	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const passwordConfirmationError = errors.password_confirmation?.message;

	const handleSignUp: SubmitHandler<ISignUpBody> = credentials => {
		if (isValid) {
			signUp(credentials)
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
				<form onSubmit={handleSubmit(handleSignUp)}>
					<Stack>
						<Box mb="sm">
							<Center>
								<Logo />
								<span className={"pl-2"}>
									<Title> Messenger </Title>
								</span>
							</Center>
						</Box>

						<FieldLegend
							legend="Account Name"
							description="How to find you? You can change it later."
							withAsterisk={true}
							errorText={accountNameError}
						>
							<Field
								required={true}
								isInvalid={Boolean(accountNameError)}
								autoComplete="off"
								{...register("account_name", {
									maxLength: {
										value: 30,
										message: "Account name can't be larger than 30 symbols"
									}
								})}
							/>
						</FieldLegend>

						<FieldLegend
							legend="Email"
							description="Available email address. You can change it later."
							withAsterisk={true}
							errorText={emailError}
						>
							<Field
								required={true}
								isInvalid={Boolean(emailError)}
								autoComplete="off"
								{...register("email", {
									maxLength: {
										value: 50,
										message: "Email can't be larger than 60 symbols"
									},
									validate: value => validateEmail(value) || "Invalid email address"
								})}
							/>
						</FieldLegend>

						<FieldLegend
							legend="Password"
							description="Don't use common passwords such as 'qwerty...'"
							withAsterisk={true}
							errorText={passwordError}
						>
							<PasswordField
								required={true}
								isInvalid={Boolean(passwordError)}
								{...register("password", {
									minLength: {
										value: 12,
										message: "Password can't be less than 12 symbols"
									},
									maxLength: {
										value: 45,
										message: "Password can't be larger than 45 symbols"
									},
									validate: {
										matchesPasswordConfirmation: passwordValue => {
											const { password_confirmation } = getValues();

											if (password_confirmation.length < 4) return undefined;
											if (passwordValue != password_confirmation) {
												setError("password_confirmation", {
													message: "Passwords don't match"
												});
												return true;
											}

											clearErrors("password_confirmation");
											return undefined;
										}
									}
								})}
							/>
						</FieldLegend>

						<FieldLegend
							legend="Password Confirmation"
							description="Just repeat your password."
							withAsterisk={true}
							errorText={passwordConfirmationError}
						>
							<PasswordField
								required={true}
								isInvalid={Boolean(passwordError || passwordConfirmationError)}
								{...register("password_confirmation", {
									validate: {
										matchesPassword: passwordConfirmationValue => {
											const { password } = getValues();

											if (passwordConfirmationValue.length < 4) return undefined;
											if (passwordConfirmationValue !== password)
												return "Passwords doesn't match";

											return undefined;
										}
									}
								})}
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
							leftIcon={<UserAddOutlined size={20} />}
							color="red"
							variant="outline"
							loading={signUpStatus.isLoading}
						>
							Sign Up
						</Button>

						<span>
							Already have an account? <TextAnchor to="/sign-in">Sign In</TextAnchor>
						</span>
					</Stack>
				</form>
			</Box>
		</AuthLayout>
	);
};

export default SignUp;
