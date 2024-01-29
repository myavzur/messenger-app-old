import React, { ButtonHTMLAttributes } from "react";

export interface IFieldActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	iconElement: React.ReactNode;
}
