import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ISignInBody } from "@/entities/user/interfaces";

import {
	Button,
	Field,
	FieldLegend,
	Logo,
	PasswordField,
	TextAnchor,
	Title
} from "@/shared/ui";

import { ISignInFormProps } from "./SignInForm.interface";

import styles from "./SignInForm.module.scss";

export const SignInForm: React.FC<ISignInFormProps> = ({
	onSubmit,
	isSubmitting
}) => {
	const {
		register,
		handleSubmit,
		formState: { isValid }
	} = useForm<ISignInBody>({ mode: "onChange" });

	const handleSignUp: SubmitHandler<ISignInBody> = credentials => {
		if (!isValid) return;
		onSubmit(credentials);
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

			<p>Forgot your password?</p>

			<Button
				disabled={isSubmitting}
				type="submit"
			>
				Sign In
			</Button>

			<span>
				Don&apos;t have an account?{" "}
				<TextAnchor to="/auth/sign-up">Sign Up</TextAnchor>
			</span>
		</form>
	);
};
