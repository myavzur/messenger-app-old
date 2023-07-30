import { InputHTMLAttributes, ReactNode } from "react";

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
	isInvalid?: boolean;
	children?: ReactNode;
}
