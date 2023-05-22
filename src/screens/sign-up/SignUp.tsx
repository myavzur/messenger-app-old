import { UserAddOutlined } from "@ant-design/icons";
import {
	Box,
	Button,
	Center,
	PasswordInput,
	Stack,
	TextInput,
	Title,
	rem
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useNavigate } from "react-router-dom";

import { AuthLayout } from "@/layouts";

import { baseApi } from "@/shared/api";
import { ISocketsContext } from "@/shared/contexts/SocketsContext";
import { ISignUpBody } from "@/shared/interfaces/user.interface";
import { useSocketsContext } from "@/shared/lib/hooks";
import { validateEmail } from "@/shared/lib/validators/email.validator";
import { Anchor, Logo, ThemedText } from "@/shared/ui";

const SignUp: React.FC = () => {
	const navigate = useNavigate();

	const [signUp, signUpStatus] = baseApi.useSignUpMutation();
	const { updateSocketsAccessToken } = useSocketsContext() as ISocketsContext;

	const form = useForm<ISignUpBody>({
		initialValues: {
			account_name: "",
			email: "",
			password: "",
			password_confirmation: ""
		},
		validate: {
			account_name: value =>
				value?.length >= 30 ? "Can't be equal or greater than 30 characters." : null,
			email: value => (validateEmail(value) ? null : "Invalid email"),
			password_confirmation: (value, values) =>
				value !== values.password ? "Passwords don't match." : null
		}
	});

	const handleSignUp = (data: ISignUpBody) => {
		signUp(data)
			.unwrap()
			.then(data => {
				updateSocketsAccessToken(data.access_token);
				navigate("/");
			});
	};

	return (
		<AuthLayout>
			<Box
				maw={rem(360)}
				w="100%"
			>
				<form onSubmit={form.onSubmit(handleSignUp)}>
					<Stack>
						<Box mb="sm">
							<Center>
								<Logo />
								<Title
									ml="sm"
									order={1}
									sx={theme => ({
										color:
											theme.colorScheme === "dark"
												? theme.colors.gray[0]
												: theme.colors.dark[9]
									})}
								>
									FireChat
								</Title>
							</Center>
						</Box>

						<TextInput
							{...form.getInputProps("account_name")}
							autoComplete="off"
							size="md"
							required={true}
							label="Account Name"
							description="How to find you? You can change it later."
							placeholder="myavzur"
							styles={theme => ({
								input: {
									[`&:hover, &:focus`]: {
										borderColor: theme.colors.red[5]
									}
								}
							})}
						/>

						<TextInput
							{...form.getInputProps("email")}
							autoComplete="off"
							size="md"
							required={true}
							label="Email"
							description="Available email address. You can change it later."
							placeholder="shwave_id404@mail.ru"
							styles={theme => ({
								input: {
									[`&:hover, &:focus`]: {
										borderColor: theme.colors.red[5]
									}
								}
							})}
						/>

						<PasswordInput
							{...form.getInputProps("password")}
							autoComplete="off"
							size="md"
							required={true}
							label="Password"
							description={"Don't use common passwords such as 'root' or'qwerty'."}
							styles={theme => ({
								input: {
									[`&:hover, &:focus`]: {
										borderColor: theme.colors.red[5]
									}
								}
							})}
						/>

						<PasswordInput
							{...form.getInputProps("password_confirmation")}
							autoComplete="off"
							size="md"
							required={true}
							label="Password Confirmation"
							description="Just repeat your password."
							styles={theme => ({
								input: {
									[`&:hover, &:focus`]: {
										borderColor: theme.colors.red[5]
									}
								}
							})}
						/>
					</Stack>

					<Stack
						mt="xl"
						align="center"
					>
						<ThemedText>Forgot your password?</ThemedText>

						<Button
							type="submit"
							leftIcon={<UserAddOutlined size={20} />}
							color="red"
							variant="outline"
							loading={signUpStatus.isLoading}
						>
							Sign Up
						</Button>

						<ThemedText>
							Already have an account? <Anchor to="/sign-in">Sign In</Anchor>
						</ThemedText>
					</Stack>
				</form>
			</Box>
		</AuthLayout>
	);
};

export default SignUp;
