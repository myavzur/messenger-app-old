import { LoginOutlined } from "@ant-design/icons";
import {
	Box,
	Button,
	Center,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
	rem,
	useMantineTheme
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useNavigate } from "react-router-dom";

import { AuthLayout } from "@/layouts";

import { baseApi } from "@/shared/api";
import { ISocketsContext } from "@/shared/contexts/SocketsContext";
import { ISignInBody } from "@/shared/interfaces/user.interface";
import { useSocketsContext } from "@/shared/lib/hooks";
import { validateEmail } from "@/shared/lib/validators/email.validator";
import { Logo, ThemedText, Anchor } from "@/shared/ui";

const SignIn: React.FC = () => {
	const navigate = useNavigate();

	const [signIn, signInStatus] = baseApi.useSignInMutation();
	const { updateSocketsAccessToken } = useSocketsContext() as ISocketsContext;

	const form = useForm<ISignInBody>({
		initialValues: {
			email: "",
			password: ""
		},
		validate: {
			email: value => (validateEmail(value) ? null : "Invalid email")
		}
	});

	const handleSignIn = (data: ISignInBody) => {
		signIn(data)
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
				<form onSubmit={form.onSubmit(handleSignIn)}>
					<Stack>
						<Box mb="md">
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
							{...form.getInputProps("email")}
							autoComplete="off"
							size="lg"
							required={true}
							label="Email"
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
							size="lg"
							required={true}
							label="Password"
							placeholder="myavzur"
							styles={theme => ({
								input: {
									[`&:hover, &:focus`]: {
										borderColor: theme.colors.red[5]
									}
								}
							})}
						/>
					</Stack>

					<Stack mt="xl" align="center" >
						<ThemedText>Forgot your password?</ThemedText>

						<Button
							type="submit"
							leftIcon={<LoginOutlined size={20} />}
							color="red"
							variant="outline"
							loading={signInStatus.isLoading}
						>
							Sign In
						</Button>

						<ThemedText>Don't have an account? <Anchor to="/sign-up">Sign Up</Anchor></ThemedText>
					</Stack>
				</form>
			</Box>
		</AuthLayout>
	);
};

export default SignIn;
