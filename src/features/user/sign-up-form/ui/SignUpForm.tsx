import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ISignUpBody } from "@/entities/user/interfaces";

import { validateEmail } from "@/shared/lib/validators";
import {
	Button,
	Field,
	FieldLegend,
	Logo,
	PasswordField,
	TextAnchor,
	Title
} from "@/shared/ui";

import { ISignUpFormProps } from "./SignUpForm.interface";

import styles from "./SignUpForm.module.scss";

export const SignUpForm: React.FC<ISignUpFormProps> = ({
	onSubmit,
	isSubmitting
}) => {
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
		if (!isValid) return;
		onSubmit(credentials);
	};

	const matchesPasswordConfirmation = (passwordValue: string) => {
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
	};

	const matchesPassword = (passwordConfirmationValue: string) => {
		const { password } = getValues();

		if (passwordConfirmationValue.length < 4) return undefined;
		if (passwordConfirmationValue !== password) return "Passwords doesn't match";

		return undefined;
	};

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit(handleSignUp)}
		>
			<div className={styles.form__header}>
				<Logo />
				<Title className="ml-2"> Messenger </Title>
			</div>

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
						validate: { matchesPasswordConfirmation }
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
						validate: { matchesPassword }
					})}
				/>
			</FieldLegend>

			<p>Forgot your password?</p>

			<Button
				disabled={isSubmitting}
				type="submit"
			>
				Sign Up
			</Button>

			<span>
				Already have an account? <TextAnchor to="/auth/sign-in">Sign In</TextAnchor>
			</span>
		</form>
	);
};
