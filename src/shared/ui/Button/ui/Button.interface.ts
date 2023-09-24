import React, { ButtonHTMLAttributes } from "react";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: React.ReactNode;
	children?: string;
	withRipple?: boolean;
}
