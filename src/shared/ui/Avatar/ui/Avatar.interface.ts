import { UserStatus } from "@/entities/user/interfaces";

export interface IAvatarProps {
	children: string;
	serverUrl?: string;
	src?: string;
	alt?: string;
	className?: string;
	size?: "xs" | "sm" | "base";
	status?: UserStatus;
}
