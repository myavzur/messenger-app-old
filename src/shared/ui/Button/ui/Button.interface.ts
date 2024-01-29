import React, { ButtonHTMLAttributes } from "react";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	iconElement?: React.ReactNode;
	children?: string;
	withRipple?: boolean;
	isFullRounded?: boolean;
	isFullWidth?: boolean;
	color?: "dangerous";
}
