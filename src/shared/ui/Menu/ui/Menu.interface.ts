import React, { HTMLAttributes } from "react";

export interface IMenuProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: React.ReactNode;
}
