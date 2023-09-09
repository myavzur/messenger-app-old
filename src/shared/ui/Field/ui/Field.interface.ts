import { InputHTMLAttributes, ReactNode } from "react";

export interface IFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	isInvalid?: boolean;
	children?: ReactNode;
}
