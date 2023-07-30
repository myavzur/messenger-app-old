import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: React.ReactNode;
	children?: string;
	onClick: () => void;
}
