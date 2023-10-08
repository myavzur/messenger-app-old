import { UserStatus } from "@/shared/interfaces/user.interface";

export interface IAvatarProps {
	children: string;
	src?: string;
	alt?: string;
	className?: string;
	size?: "xs" | "sm" | "base";
	status?: UserStatus;
}
