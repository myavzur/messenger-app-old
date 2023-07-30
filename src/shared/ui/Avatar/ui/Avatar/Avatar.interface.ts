import React from "react";

export interface AvatarProps {
	children: string;
	src?: string;
	alt?: string;
	className?: string;
	size?: "sm" | "base";
}
