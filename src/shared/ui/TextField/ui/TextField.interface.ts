import React, { InputHTMLAttributes } from "react";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	description?: string;
	error?: string;
	children?: React.ReactNode;
}