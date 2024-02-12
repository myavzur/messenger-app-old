import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";

export interface IFieldActionProps {
	wrapperProps?: HTMLAttributes<HTMLDivElement>;
	buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
	iconElement: React.ReactNode;
	children?: React.ReactNode;
}
